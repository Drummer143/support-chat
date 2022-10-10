import * as Yup from 'yup';
import { Fade } from 'reactstrap';
import { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { AppState } from '../../../types/types';
import { passwordRecoverRequest, resetError } from '../../../redux/actions/actions';
import { handleAuthError, emailSignInValSchema } from '../../../utils';

import './../commonStyles.css';
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
    const dispatch = useDispatch();
    const { isRecovered, error } = useSelector((state: AppState) => state.authReducer);
    const validationSchema = Yup.object().shape({ email: emailSignInValSchema });

    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    });

    return isRecovered ? (
        <Navigate to="/forgot-password-redirect" />
    ) : (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                dispatch(passwordRecoverRequest(values));
            }}
        >
            <Form className="wrapper">
                <h1>Recover password</h1>

                <div className="inputWrapper">
                    <Field name="email" type="text" placeholder="email" className="inputField" />
                    <div className="error">
                        <ErrorMessage name="email" />
                    </div>
                </div>

                {/* error contains object if there is an error or empty string if there is no error 
                        but prop "in" in Fade attribute can accepts only boolean type 
                        so i added this condition */}
                <Fade in={error ? true : false} className="authError">
                    {error && handleAuthError(error)}
                </Fade>

                <button type="submit" className={`${styles.submit} submit`}>
                    Submit
                </button>

                <div className={styles.footer}>
                    <NavLink to="/sign-up" className={styles.footerLink}>
                        Create account
                    </NavLink>
                    <NavLink to="/sign-in" className={styles.footerLink}>
                        Login
                    </NavLink>
                </div>
            </Form>
        </Formik>
    );
}

export default ForgotPassword;
