import * as Yup from 'yup';
import { toast, ToastOptions } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import React, { useState } from 'react';
import { AppState } from '../../../types/types';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { emailSchema, passwordSchema, confirmPasswordSchema } from '../../../utils';
import {
    updateNameRequest,
    updatePasswordRequest,
    updateEmailRequest
} from '../../../redux/actions/actions';

import styles from './ProfileSettings.module.css';

const toastParams: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored'
};

type updatingField = {
    field: string
    value: string
}

function ProfileSettings() {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.authReducer.user);
    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema
    });
    const [reAuthFormDisplay, setReAuthFormDisplay] = useState('none');
    const [updatingField, setUpdatingField] = useState({} as updatingField);
    const [password, setPassword] = useState('');

    const reAuthentication = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassword('');
        const credential = EmailAuthProvider.credential(user.email || '', password);
        reauthenticateWithCredential(user, credential)
            .then(() => setReAuthFormDisplay('none'))
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, field: string, value: string) => {
        e.preventDefault();
        if (value) {
            switch (field) {
                case 'name':
                    if (user.displayName !== value) {
                        dispatch(updateNameRequest(value));
                    } else {
                        toast.error('This name is already in use', toastParams);
                    }
                    break;

                case 'email':
                    if (user.email !== value) {
                        setReAuthFormDisplay('flex');
                        setUpdatingField({ field: 'email', value });
                    } else {
                        toast.error('This email is already in use', toastParams);
                    }
                    break;

                case 'password':
                    setReAuthFormDisplay('flex');
                    setUpdatingField({ field: 'password', value });
                    break;

                default:
                    toast.error('Something wrong with site. Contact technical support.', toastParams);
            }
        } else {
            alert('empty');
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2>Profile</h2>

            <Formik
                initialValues={{
                    name: user.displayName || '',
                    email: user.email || '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {formik => (
                    <>
                        <Form
                            className={styles.form}
                            onSubmit={e => handleSubmit(e, 'name', formik.values.name)}
                        >
                            <h3>Update Name</h3>
                            <Field type="text" name="name" />
                            <p>
                                <ErrorMessage name="name" />
                            </p>
                        </Form>

                        <Form
                            className={styles.form}
                            onSubmit={e => handleSubmit(e, 'email', formik.values.email)}
                        >
                            <h3>Update Email</h3>
                            <Field type="email" name="email" />
                            <p>
                                <ErrorMessage name="email" />
                            </p>
                        </Form>

                        <Form
                            className={styles.form}
                            onKeyDown={e => {
                                if(e.keyCode === 13) {
                                    handleSubmit(e, 'password', formik.values.password);
                                }
                            }}
                        >
                            <h3>Update Password</h3>
                            <Field type="password" name="password" />
                            <p>
                                <ErrorMessage name="password" />
                            </p>

                            <Field type="password" name="confirmPassword" />
                            <p>
                                <ErrorMessage name="confirmPassword" />
                            </p>
                        </Form>
                    </>
                )}
            </Formik>

            <div className={styles.reAuthForm} style={{ display: reAuthFormDisplay }}>
                <form onSubmit={e => reAuthentication(e)}>
                    <h3>Type your password to confirm changes</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className={styles.buttons}>
                        <button type="button" onClick={() => setReAuthFormDisplay('none')}>
                            Cancel
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileSettings;
