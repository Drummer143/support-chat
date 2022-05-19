import defaultState from './../defaultState';
import { FETCH_EMAIL_FAILURE, FETCH_EMAIL_SUCCESS, FETCH_EMAIL_REQUEST } from './../actions/actions';

const signInReducer = (state = defaultState, action) => {
    debugger
    switch(action.type) {
        case FETCH_EMAIL_FAILURE:
            return { 
                request: false,
                success: false,
                error: action.error
            };
        case FETCH_EMAIL_REQUEST:
            return {
                request: true,
                success: false,
                error: ''
            };
        case FETCH_EMAIL_SUCCESS:
            return {
                request: false,
                success:true,
                error: ''
            };
        default: return state;
    };
}

export default signInReducer;