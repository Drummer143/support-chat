import { AuthState, ChatState } from '../types/types';

export const authDefaultState: AuthState = {
    requesting: false,
    user: null,
    error: null
};

export const chatDefaultState: ChatState = {
    status: 'active',
    dialogs: []
};
