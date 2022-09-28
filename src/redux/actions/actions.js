export const FETCH_LOGIN_EMAIL_REQUEST = 'FETCH_LOGIN_EMAIL_REQUEST';
export const FETCH_LOGIN_GOOGLE_REQUEST = 'FETCH_LOGIN_GOOGLE_REQUEST';
export const FETCH_SIGN_UP_REQUEST = 'FETCH_SIGN_UP_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_LOGIN_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_LOGIN_AUTH_FAILURE';

export const FETCH_SIGN_OUT_REQUEST = 'FETCH_SIGN_OUT';
export const FETCH_SIGN_OUT_SUCCESS = 'FETCH_SIGN_OUT_SUCCESS';

export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';

export const FETCH_PASSWORD_UPDATE_REQUEST = 'FETCH_PASSWORD_UPDATE_REQUEST';
export const FETCH_PASSWORD_UPDATE_SUCCESS = 'FETCH_PASSWORD_UPDATE_SUCCESS';

export const RESET_ERROR = 'RESET_ERROR';

export const signInEmailRequest = ({ email, password }) => ({
    type: FETCH_LOGIN_EMAIL_REQUEST,
    email,
    password
});
export const signInGoogleRequest = () => ({ type: FETCH_LOGIN_GOOGLE_REQUEST });
export const signUpEmailRequest = ({ email, password }) => ({
    type: FETCH_SIGN_UP_REQUEST,
    email,
    password
});
export const authSuccess = () => ({ type: FETCH_AUTH_SUCCESS });
export const authFailure = error => ({ type: FETCH_AUTH_FAILURE, error });

export const signOutRequest = () => ({ type: FETCH_SIGN_OUT_REQUEST });
export const signOutSuccess = () => ({ type: FETCH_SIGN_OUT_SUCCESS });

export const passwordRecoverRequest = ({ email }) => ({
    type: FETCH_PASSWORD_RECOVER_REQUEST,
    email
});
export const passwordResetSuccess = () => ({
    type: FETCH_PASSWORD_RECOVER_SUCCESS
});

export const passwordUpdateRequest = ({ password, oobCode }) => ({
    type: FETCH_PASSWORD_UPDATE_REQUEST,
    password,
    oobCode
});
export const passwordUpdateSuccess = () => ({
    type: FETCH_PASSWORD_UPDATE_SUCCESS
});

export const resetError = () => ({
    type: RESET_ERROR
});

export const CHANGE_STATUS = 'CHANGE_STATUS';

export const FETCH_GET_DATA = 'FETCH_GET_DATA';

export const changeStatus = status => ({
    type: CHANGE_STATUS,
    status
});

export const getDataSuccess = (dialogs, status) => ({
    type: FETCH_GET_DATA,
    status,
    dialogs
});

export const UPDATE_NAME_REQUEST = 'UPDATE_NAME_REQUEST';
export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

export const updateNameRequest = name => ({
    type: UPDATE_NAME_REQUEST,
    name
});
export const updatePasswordRequest = password => ({
    type: UPDATE_PASSWORD_REQUEST,
    password
});
export const updateEmailRequest = email => ({
    type: UPDATE_EMAIL_REQUEST,
    email
});
export const updateProfileSuccess = user => ({
    type: UPDATE_PROFILE_SUCCESS,
    user
});
