import { FirebaseError } from 'firebase/app';

import { Action } from '../../types/types';
import { DataDialog } from '../../types/firebaseDataTypes';

export const FETCH_LOGIN_EMAIL_REQUEST = 'FETCH_LOGIN_EMAIL_REQUEST';
export const signInEmailRequest = ({ email = '', password = '' }: Action) => ({
    type: FETCH_LOGIN_EMAIL_REQUEST,
    email,
    password
});

export const FETCH_LOGIN_GOOGLE_REQUEST = 'FETCH_LOGIN_GOOGLE_REQUEST';
export const signInGoogleRequest = () => ({ type: FETCH_LOGIN_GOOGLE_REQUEST });

export const FETCH_SIGN_UP_REQUEST = 'FETCH_SIGN_UP_REQUEST';
export const signUpEmailRequest = ({ email = '', password = '' }: Action) => ({
    type: FETCH_SIGN_UP_REQUEST,
    email,
    password
});

export const FETCH_AUTH_SUCCESS = 'FETCH_LOGIN_AUTH_SUCCESS';
export const authSuccess = () => ({ type: FETCH_AUTH_SUCCESS });

export const FETCH_AUTH_FAILURE = 'FETCH_LOGIN_AUTH_FAILURE';
export const authFailure = (error: FirebaseError) => ({ type: FETCH_AUTH_FAILURE, error });

export const FETCH_SIGN_OUT_REQUEST = 'FETCH_SIGN_OUT_REQUEST';
export const signOutRequest = () => ({ type: FETCH_SIGN_OUT_REQUEST });

export const FETCH_SIGN_OUT_SUCCESS = 'FETCH_SIGN_OUT_SUCCESS';
export const signOutSuccess = () => ({ type: FETCH_SIGN_OUT_SUCCESS });

export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const passwordRecoverRequest = ({ email = '' }: Action) => ({
    type: FETCH_PASSWORD_RECOVER_REQUEST,
    email
});

export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';
export const passwordResetSuccess = () => ({
    type: FETCH_PASSWORD_RECOVER_SUCCESS
});

export const FETCH_PASSWORD_UPDATE_REQUEST = 'FETCH_PASSWORD_UPDATE_REQUEST';
export const passwordUpdateRequest = ({ password = '', oobCode = null }: Action) => ({
    type: FETCH_PASSWORD_UPDATE_REQUEST,
    password,
    oobCode
});

export const FETCH_PASSWORD_UPDATE_SUCCESS = 'FETCH_PASSWORD_UPDATE_SUCCESS';
export const passwordUpdateSuccess = () => ({
    type: FETCH_PASSWORD_UPDATE_SUCCESS
});

export const RESET_ERROR = 'RESET_ERROR';
export const resetError = () => ({
    type: RESET_ERROR
});

export const CHANGE_STATUS = 'CHANGE_STATUS';
export const changeStatus = (status: string) => ({
    type: CHANGE_STATUS,
    status
});

export const FETCH_GET_DIALOGS_SUCCESS = 'FETCH_GET_DIALOGS_SUCCESS';
export const getDialogsSuccess = (dialogs: DataDialog[]) => ({
    type: FETCH_GET_DIALOGS_SUCCESS,
    dialogs
});

export const FETCH_GET_SNIPPETS_SUCCESS = 'FETCH_GET_SNIPPETS_SUCCESS';
export const getSnippetsSuccess = (snippets: string[]) => ({
    type: FETCH_GET_SNIPPETS_SUCCESS,
    snippets
});

export const UPDATE_NAME_REQUEST = 'UPDATE_NAME_REQUEST';
export const updateNameRequest = (name: string) => ({
    type: UPDATE_NAME_REQUEST,
    name
});

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const updatePasswordRequest = (password: string) => ({
    type: UPDATE_PASSWORD_REQUEST,
    password
});

export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const updateEmailRequest = (email: string) => ({
    type: UPDATE_EMAIL_REQUEST,
    email
});

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const updateProfileSuccess = (user: string) => ({
    type: UPDATE_PROFILE_SUCCESS,
    user
});
