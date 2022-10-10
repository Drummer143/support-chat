import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { PersistState } from 'redux-persist';
import { Dialog } from './firebaseDataTypes';

export type AuthState = {
    requesting: boolean
    user: User | null
    error: null | FirebaseError
    isRecovered?: boolean
}

export type ChatState = {
    status: string
    dialogs: Dialog[]
}

export type Action = {
    type?: string
    error?: FirebaseError
    status?: string
    dialogs?: Dialog[]
    email?: string
    password?: string
    oobCode?: string
}

export type AppState = {
    authReducer: AuthState
    chatReducer: ChatState
    _persist: PersistState
}