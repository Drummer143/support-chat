import { DataDialog } from '../../types/firebaseDataTypes';
import { chatDefaultState } from '../defaultState';
import { Action, ChatState } from '../../types/types';
import { FETCH_SIGN_OUT_SUCCESS } from '../actions/actions';
import {
    CHANGE_STATUS,
    FETCH_GET_DIALOGS_SUCCESS,
    FETCH_GET_SNIPPETS_SUCCESS
} from '../actions/actions';

const chatReducer = (state = chatDefaultState, action: Action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return {
                status: action?.status,
                dialogs: state.dialogs,
                snippets: state.snippets
            } as ChatState;
        }

        case FETCH_GET_DIALOGS_SUCCESS: {
            let dialogs: DataDialog[] = JSON.parse(JSON.stringify(action.dialogs));

            if (dialogs) {
                dialogs.forEach(dialog => {
                    if (!Array.isArray(dialog.messages)) {
                        dialog.messages = Object.values(dialog.messages);
                    }

                    dialog.messages = dialog.messages.filter(message => message !== null);
                });
            } else {
                dialogs = [];
            }

            return {
                status: state.status,
                dialogs: dialogs,
                snippets: state.snippets
            } as ChatState;
        }

        case FETCH_GET_SNIPPETS_SUCCESS: {
            let data = action.snippets;

            if (data) {
                if (!Array.isArray(data)) {
                    data = Object.values(data);
                }
                data = data.filter(field => field);
            } else {
                data = [];
            }

            return {
                status: state.status,
                snippets: data
            } as ChatState;
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
