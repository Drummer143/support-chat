import { User } from 'firebase/auth';
import { AuthState, ChatState } from '../types/types';

export const authDefaultState: AuthState = {
    requesting: false,
    user: {} as User,
    error: null
};

export const chatDefaultState: ChatState = {
    status: 'active',
    dialogs: [],
    snippets: []
};
