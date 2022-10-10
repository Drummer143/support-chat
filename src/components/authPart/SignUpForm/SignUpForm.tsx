import * as Yup from 'yup';
import { Fade } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { AppState } from '../../../types/types';
import { resetError, signUpEmailRequest } from '../../../redux/actions/actions';
import {
    handleAuthError,
    emailSignUpValSchema,
    passwordSignUpValSchema,
    confirmPasswordSchema
} from '../../../utils';

import './../commonStyles.css';
import styles from './SignUpForm.module.css';

function SignUpForm() {
    const dispatch = useDispatch();
    const error = useSelector((state: AppState) => state.authReducer.error);
    const validationSchema = Yup.object().shape({
        email: emailSignUpValSchema,
        password: passwordSignUpValSchema,
        confirmPassword: confirmPasswordSchema
    });

    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    });

    return (
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={values => {
                dispatch(signUpEmailRequest(values));
            }}
        >
            <Form className="wrapper">
                <h1>Create an account</h1>

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
                </div>

                <div className="inputWrapper">
                    <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                        className="inputField"
                    />
                    <div className="error">
                        <ErrorMessage name="confirmPassword" />
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
                    Already have an account? Login{' '}
                    <NavLink to="/sign-in" className={styles.footerLink}>
                        here
                    </NavLink>
                </div>
            </Form>
        </Formik>
    );
}

export default SignUpForm;
