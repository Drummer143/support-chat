import * as Yup from 'yup';
import { toast, ToastOptions } from 'react-toastify';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { AppState, DynamicObject } from '../../../types/types';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { emailSchema, passwordSchema, confirmPasswordSchema } from '../../../utils';
import {
    updateNameRequest,
    updatePasswordRequest,
    updateEmailRequest
} from '../../../redux/actions/actions';

import styles from './ProfileSettings.module.css';
import Modal from './../../Modal/Modal';
import UpdateProfileForm from '../UpdateProfileForm/UpdateProfileForm';
import { auth } from './../../../firebase';

type UpdatingField = {
    field: string;
    value: string;
};

const toastParams: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored'
};

function ProfileSettings() {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.authReducer.user);
    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema
    });
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [updatingField, setUpdatingField] = useState({} as UpdatingField);
    const [password, setPassword] = useState('f');
    const ModalInputRef = useRef<HTMLInputElement>(null);

    const reAuthentication = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassword('');
        setUpdatingField({} as UpdatingField);

        const credential = EmailAuthProvider.credential(user.email || '', password);
        reauthenticateWithCredential(auth.currentUser || user, credential)
            .then(() => setShouldShowModal(false))
            .then(() => {
                switch (updatingField.field) {
                    case 'email':
                        dispatch(updateEmailRequest(updatingField.value));
                        break;

                    case 'password':
                        dispatch(updatePasswordRequest(updatingField.value));
                        break;
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className={styles.wrapper}>
            <h2>Profile</h2>

            <UpdateProfileForm
                heading="Update Name"
                fields={['name']}
                types={['text']}
                values={{ name: user.displayName }}
                handleSubmit={({ name }: DynamicObject) => {
                    if (user.displayName !== name) {
                        dispatch(updateNameRequest(name));
                    } else {
                        toast.error('This name is already in use', toastParams);
                    }
                }}
            />

            <UpdateProfileForm
                heading="Update Email"
                fields={['email']}
                types={['text']}
                values={{ email: user.email }}
                handleSubmit={({ email }: DynamicObject) => {
                    if (user.email !== email) {
                        setUpdatingField({ field: 'email', value: email });
                        setShouldShowModal(true);
                    } else {
                        toast.error('This email is already in use', toastParams);
                    }
                }}
            />

            <UpdateProfileForm
                heading="Update Password"
                fields={['password', 'confirmPassword']}
                types={['password', 'password']}
                values={{ password: '', confirmPassword: '' }}
                handleSubmit={({ password }: DynamicObject) => {
                    setUpdatingField({ field: 'password', value: password });
                    setShouldShowModal(true);
                }}
            />

            {shouldShowModal && (
                <Modal
                    className={styles.overlayContainer}
                    handleOverlayClick={() => setShouldShowModal(false)}
                    handleEscapeButtonClick={() => setShouldShowModal(false)}
                    onMount={() => ModalInputRef.current?.focus()}
                >
                    <form onSubmit={e => reAuthentication(e)}>
                        <h3>Type your password to confirm changes</h3>
                        <input
                            ref={ModalInputRef}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className={styles.buttons}>
                            <button type="button" onClick={() => setShouldShowModal(false)}>
                                Cancel
                            </button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default ProfileSettings;
