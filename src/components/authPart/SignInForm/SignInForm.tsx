import * as Yup from 'yup';
import { Fade } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { AppState } from '../../../types/types';
import { handleAuthError, emailSignInValSchema, passwordSignInValSchema } from '../../../utils';
import {
    resetError,
    signInEmailRequest,
    signInGoogleRequest
} from '../../../redux/actions/actions';

import './../commonStyles.css';
import styles from './SignInForm.module.css';

function SignInForm() {
    const dispatch = useDispatch();
    const error = useSelector((state: AppState) => state.authReducer.error);
    const validationSchema = Yup.object().shape({
        email: emailSignInValSchema,
        password: passwordSignInValSchema
    });
    const initialValue = {
        email: '',
        password: ''
    };

    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    });

    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={values => {
                dispatch(signInEmailRequest(values));
            }}
        >
            <Form className="wrapper">
                <h1>Welcome back!</h1>

                <div className="inputWrapper">
                    <Field name="email" type="text" placeholder="email" className="inputField" />

                    <div className="error">
                        <ErrorMessage name="email" />
                    </div>
                </div>

                <div className="inputWrapper">
                    <Field
                        name="password"
                        type="password"
                        placeholder="password"
                        className="inputField"
                    />

                    <div className="error">
                        <ErrorMessage name="password" />
                    </div>

                    <NavLink
                        to="/forgot-password"
                        onClick={() => dispatch(resetError())}
                        className={styles.forgotPassword}
                    >
                        Forgot password?
                    </NavLink>
                </div>

                {/* error contains object if there is an error or empty string if there is no error 
                        but prop "in" in Fade attribute can accepts only boolean type 
                        so i added this condition */}
                <Fade in={error ? true : false} className="authError">
                    {error && handleAuthError(error)}
                </Fade>

                <div className={styles.buttons}>
                    <button type="submit" className="submit">
                        Sign In
                    </button>

                    <div>or</div>

                    <button
                        type="button"
                        onClick={() => dispatch(signInGoogleRequest())}
                        className={styles.googleAuth}
                    >
                        <FontAwesomeIcon icon={faGoogle} /> Login with Google
                    </button>
                </div>

                <div className={styles.footer}>
                    Don't have an account? Create it{' '}
                    <NavLink
                        to="/sign-up"
                        onClick={() => dispatch(resetError())}
                        className={styles.footerLink}
                    >
                        here
                    </NavLink>
                </div>
            </Form>
        </Formik>
    );
}

export default SignInForm;
