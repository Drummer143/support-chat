import { AuthState, ChatState } from "../types";

export const authDefaultState: AuthState = {
    requesting: false,
    user: false,
    error: null
};

export const chatDefaultState: ChatState = {
    status: 'active',
    dialogs: []
};
