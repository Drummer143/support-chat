import { auth } from '../../firebase';
import { Action } from '../../types';
import { authDefaultState } from '../defaultState';
import {
    UPDATE_PROFILE_SUCCESS,
    FETCH_SIGN_UP_REQUEST,
    FETCH_LOGIN_EMAIL_REQUEST,
    FETCH_LOGIN_GOOGLE_REQUEST,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_FAILURE,
    FETCH_PASSWORD_RECOVER_REQUEST,
    FETCH_PASSWORD_RECOVER_SUCCESS,
    FETCH_PASSWORD_UPDATE_REQUEST,
    FETCH_PASSWORD_UPDATE_SUCCESS,
    FETCH_SIGN_OUT_REQUEST,
    FETCH_SIGN_OUT_SUCCESS,
    RESET_ERROR,
    UPDATE_EMAIL_REQUEST,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_NAME_REQUEST
} from '../actions/actions';

const AuthReducer = (state = authDefaultState, action: Action) => {
    switch (action.type) {
        case FETCH_SIGN_UP_REQUEST:
        case FETCH_LOGIN_GOOGLE_REQUEST:
        case FETCH_LOGIN_EMAIL_REQUEST:
        case FETCH_PASSWORD_RECOVER_REQUEST:
        case FETCH_PASSWORD_UPDATE_REQUEST:
        case FETCH_SIGN_OUT_REQUEST:
            return {
                requesting: true
            };

        case UPDATE_PROFILE_SUCCESS:
        case FETCH_AUTH_SUCCESS:
            return {
                user: auth.currentUser
            };

        case FETCH_AUTH_FAILURE:
            return {
                error: action?.error
            };

        case FETCH_PASSWORD_UPDATE_SUCCESS:
        case FETCH_PASSWORD_RECOVER_SUCCESS:
            return {
                recovered: true
            };

        case FETCH_SIGN_OUT_SUCCESS:
            localStorage.clear();

        case RESET_ERROR:
            return authDefaultState;

        case UPDATE_NAME_REQUEST:
        case UPDATE_EMAIL_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        default:
            return state;
    }
};

export default AuthReducer;
