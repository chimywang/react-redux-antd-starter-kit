import {canUseDOM} from 'exenv';

export let cookies = {
    set({ name, value = '', path = '/', domain = '', expires = '' }) {
        if (!canUseDOM) { return; }

        if (expires instanceof Date) {
            expires = expires.toUTCString();
        }

        document.cookie = [
            `${name}=${value}`,
            `path=${path}`,
            `domain=${domain}`,
            `expires=${expires}`
        ].join(';');
    },

    unset(name) {
        cookies.set({ name, expires: new Date(0) });
    },

    get(name) {
        var re = new RegExp(['(?:^|; )',
                             name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
                             '=([^;]*)'
        ].join(''));

        var matches = document.cookie.match(re);

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
};

export function checkStatus(response) {
    if (!response.ok) {   // (response.status < 200 || response.status > 300)
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

export function parseJSON(response) {
    return response.json();
}

export function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
	if (!ob.hasOwnProperty(i)) continue;

	if ((typeof ob[i]) == 'object') {
	    var flatObject = flattenObject(ob[i]);
	    for (var x in flatObject) {
		if (!flatObject.hasOwnProperty(x)) continue;

		toReturn[i + '.' + x] = flatObject[x];
	    }
	} else {
	    toReturn[i] = ob[i];
	}
    }
    return toReturn;
};
