import { CHANGE_STATUS, FETCH_GET_DATA } from '../actions/actions';
import { chatDefaultState } from '../defaultState';
import { FETCH_SIGN_OUT_SUCCESS } from '../actions/actions';

const chatReducer = (state = chatDefaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return {
                status: action.status,
                dialogs: state.dialogs
            };
        }

        case FETCH_GET_DATA: {
            return {
                status: state.status,
                dialogs: action.dialogs
            };
        }

        case FETCH_SIGN_OUT_SUCCESS:
            localStorage.clear();
            return chatDefaultState;

        default: {
            return state;
        }
    }
};

export default chatReducer;
