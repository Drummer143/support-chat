import { toast } from 'react-toastify';
import { auth, provider } from '../../firebase';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateProfile,
    updateEmail,
    updatePassword
} from 'firebase/auth';

import {
    authSuccess,
    authFailure,
    signOutSuccess,
    passwordResetSuccess,
    passwordUpdateSuccess,
    updateProfileSuccess,
    FETCH_LOGIN_EMAIL_REQUEST,
    FETCH_LOGIN_GOOGLE_REQUEST,
    FETCH_SIGN_UP_REQUEST,
    FETCH_SIGN_OUT_REQUEST,
    FETCH_PASSWORD_RECOVER_REQUEST,
    FETCH_PASSWORD_UPDATE_REQUEST,
    UPDATE_NAME_REQUEST,
    UPDATE_EMAIL_REQUEST,
    UPDATE_PASSWORD_REQUEST
} from '../actions/actions';

const toastParams = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored'
};

function* workerSignInWithEmail(action) {
    try {
        yield call(signInWithEmailAndPassword, auth, action.email, action.password);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignInWithGoogle() {
    try {
        yield call(signInWithPopup, auth, provider);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignUpWithEmail(action) {
    try {
        yield call(createUserWithEmailAndPassword, auth, action.email, action.password);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignOut() {
    yield auth.signOut();
    yield put(signOutSuccess());
}

function* workerRecoverPassword(action) {
    try {
        yield call(sendPasswordResetEmail, auth, action.email);
        yield put(passwordResetSuccess());
        yield toast.success(
            'Check your email and follow the link we sent to restore your account password',
            toastParams
        );
    } catch (error) {
        yield put(authFailure(error));
    }
}

const toastUpdate = (status, target) => {
    if (status === 'success') {
        toast.success(`Your ${target} has been successfully changed`, toastParams);
    } else {
        toast.error(`Something wrong with updating your ${target}. Try again later.`, toastParams);
    }
};

function* workerUpdatePassword(action) {
    try {
        yield call(confirmPasswordReset, auth, action.oobCode, action.password);
        yield put(passwordUpdateSuccess());
        yield toastUpdate('success', 'password');
    } catch (error) {
        yield toastUpdate('error', 'password');
        yield put(authFailure(error));
    }
}

function* workerChangeName(action) {
    try {
        yield call(updateProfile, auth.currentUser, { displayName: action.name });
        yield put(updateProfileSuccess(auth.currentUser));
        yield toastUpdate('success', 'name');
    } catch (error) {
        yield toastUpdate('error', 'name');
    }
}

function* workerChangeEmail(action) {
    try {
        yield call(updateEmail, auth.currentUser, action.email);
        yield put(updateProfileSuccess(auth.currentUser));
        yield toastUpdate('success', 'email');
    } catch (error) {
        yield toastUpdate('error', 'email');
    }
}

function* workerChangePassword(action) {
    try {
        yield call(updatePassword, auth.currentUser, action.password);
        yield put(updateProfileSuccess(auth.currentUser));
        yield toastUpdate('success', 'password');
    } catch (error) {
        yield toastUpdate('error', 'password');
    }
}

function* watcherAuth() {
    yield takeLatest(FETCH_LOGIN_EMAIL_REQUEST, workerSignInWithEmail);
    yield takeLatest(FETCH_LOGIN_GOOGLE_REQUEST, workerSignInWithGoogle);
    yield takeLatest(FETCH_SIGN_UP_REQUEST, workerSignUpWithEmail);
    yield takeLatest(FETCH_SIGN_OUT_REQUEST, workerSignOut);
    yield takeLatest(FETCH_PASSWORD_RECOVER_REQUEST, workerRecoverPassword);
    yield takeLatest(FETCH_PASSWORD_UPDATE_REQUEST, workerUpdatePassword);
    yield takeLatest(UPDATE_NAME_REQUEST, workerChangeName);
    yield takeLatest(UPDATE_EMAIL_REQUEST, workerChangeEmail);
    yield takeLatest(UPDATE_PASSWORD_REQUEST, workerChangePassword);
}

export default watcherAuth;
