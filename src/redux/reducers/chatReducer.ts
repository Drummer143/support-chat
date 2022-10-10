import { CHANGE_STATUS, FETCH_GET_DATA } from '../actions/actions';
import { FETCH_SIGN_OUT_SUCCESS } from '../actions/actions';
import { chatDefaultState } from '../defaultState';
import { Action } from '../../types/types';

const chatReducer = (state = chatDefaultState, action: Action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return {
                status: action?.status,
                dialogs: state.dialogs
            };
        }

        case FETCH_GET_DATA: {
            const dialogs = action.dialogs;

            if (dialogs) {
                dialogs.forEach(dialog => {
                    if (!Array.isArray(dialog.messages)) {
                        const messages = dialog.messages;
                        dialog.messages = [];
                        const keys = Object.keys(messages);
                        for (let i = 0; i < keys.length; i++) {
                            dialog.messages.push(messages[keys[i]]);
                        }
                    } else {
                        dialog.messages = dialog.messages.filter(message => message !== null);
                    }
                });
            }

            return {
                status: state.status,
                dialogs: action?.dialogs
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
