import { MultiFactorUser } from "firebase/auth"
import { FirebaseError } from 'firebase/app';

export type AuthState = {
    requesting: boolean
    user: false | MultiFactorUser
    error: null | FirebaseError
}

export type ChatState = {
    status: string
    dialogs: []
}

export type Action = {
    type: string
    error?: FirebaseError
    status: string
    dialogs?: []
    email?: string
    password?: string
    oobCode?: string
}