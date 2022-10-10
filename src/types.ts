import { MultiFactorUser } from "firebase/auth"
import { FirebaseError } from 'firebase/app';
import { PersistState } from "redux-persist";

export type AuthState = {
    requesting: boolean
    user: false | MultiFactorUser
    error: null | FirebaseError
    isRecovered?: boolean
}

export type ChatState = {
    status: string
    dialogs: []
}

export type Action = {
    type?: string
    error?: FirebaseError
    status?: string
    dialogs?: []
    email?: string
    password?: string
    oobCode?: string
}

export type AppState = {
    authReducer: AuthState
    chatReducer: ChatState
    _persist: PersistState
}