import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { PersistState } from 'redux-persist';
import { DataDialog } from './firebaseDataTypes';

export type AuthState = {
    requesting: boolean;
    user: User;
    error: null | FirebaseError;
    isRecovered?: boolean;
};

export type ChatState = {
    status: string;
    dialogs: DataDialog[];
};

export type Action = {
    type?: string;
    error?: FirebaseError;
    status?: string;
    dialogs?: DataDialog[];
    email?: string;
    password?: string;
    oobCode?: string | null;
};

export type AppState = {
    authReducer: AuthState;
    chatReducer: ChatState;
    _persist: PersistState;
};

export type DialogStatus = 'completed' | 'active' | 'queue';

export type DynamicObject = {
    [key: string]: any;
};
