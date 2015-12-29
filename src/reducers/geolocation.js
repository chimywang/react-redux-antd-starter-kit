import _ from 'lodash';

import {
    BROWSER_SUPPORT,
    BROWSER_NOT_SUPPORT,
    GET_GEOLOCATION_SUCCESS,
    GET_GEOLOCATION_FAILURE,
    CREATE_PLACE_REQUEST,
    CREATE_PLACE_SUCCESS,
    CREATE_PLACE_FAILURE,
    CHECK_IN_REQUEST,
    CHECK_IN_SUCCESS,
    CHECK_IN_FAILURE,
    GET_CHECK_IN_REQUEST,
    GET_CHECK_IN_SUCCESS,
    GET_CHECK_IN_FAILURE,
    UPDATE_CHECK_IN_REQUEST,
    UPDATE_CHECK_IN_SUCCESS,
    UPDATE_CHECK_IN_FAILURE,
    DELETE_CHECK_IN_REQUEST,
    DELETE_CHECK_IN_SUCCESS,
    DELETE_CHECK_IN_FAILURE,
    EDIT_CHECK_IN,
    CANCEL_EDIT_CHECK_IN
} from '../actions/geolocation';

const initialState = {
    support: null,
    placeId: null,
    deletingCheckInId: null,
    editingCheckInId: null,
    placeName: null,
    checkInId: null,
    checkIns: [],
    lat: 25.047924,
    lon: 121.517065,
    creatingPlace: false,
    checkingIn: false,
    gettingCheckIn: false
};

export default function record(state = initialState, action = {}) {
    switch (action.type) {
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: true});
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: false});
        case GET_GEOLOCATION_SUCCESS:
            return Object.assign({}, initialState, {lat: action.lat, lon: action.lon});
        case GET_GEOLOCATION_FAILURE:
            return {...state};
        case CREATE_PLACE_REQUEST:
            return Object.assign({}, state, {creatingPlace: true});
        case CREATE_PLACE_SUCCESS:
            return Object.assign({}, state, {creatingPlace: false, placeId: action.id, placeName: action.name});
        case CREATE_PLACE_FAILURE:
            return {...state, creatingPlace: false};
        case CHECK_IN_REQUEST:
            return Object.assign({}, state, {checkingIn: true});
        case CHECK_IN_SUCCESS:
            return Object.assign({}, state, {checkingIn: false, checkInId: action.id});
        case CHECK_IN_FAILURE:
            return {...state, checkingIn: false};
        case GET_CHECK_IN_REQUEST:
            return Object.assign({}, state, {gettingCheckIn: true});
        case GET_CHECK_IN_SUCCESS:
            return Object.assign({}, state, {gettingCheckIn: false, checkIns: action.checkIns});
        case GET_CHECK_IN_FAILURE:
            return {...state, gettingCheckIn: false};

        case UPDATE_CHECK_IN_REQUEST:
            return Object.assign({}, state, {updatingCheckInId: action.id});
        case UPDATE_CHECK_IN_SUCCESS:

            return Object.assign({}, state, {checkIns: checkIns, updatingCheckInId: null});
        case UPDATE_CHECK_IN_FAILURE:
            return {...state, updatingCheckInId: null};

        case DELETE_CHECK_IN_REQUEST:
            return Object.assign({}, state, {deletingCheckInId: action.id});
        case DELETE_CHECK_IN_SUCCESS:
            let checkIns = _.reject(state.checkIns, (checkIn) => {return checkIn.id == action.id;});
            return Object.assign({}, state, {checkIns: checkIns, deletingCheckInId: null});
        case DELETE_CHECK_IN_FAILURE:
            return {...state, deletingCheckInId: null};
        case EDIT_CHECK_IN:
            return Object.assign({}, state, {editingCheckInId: action.id});
        case CANCEL_EDIT_CHECK_IN:
            return Object.assign({}, state, {editingCheckInId: null});

        default:
            return state;
    }
}