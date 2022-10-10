import * as Yup from 'yup';
import { Fade } from 'reactstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { AppState } from '../../../types/types';
import { passwordUpdateRequest, resetError } from '../../../redux/actions/actions';
import { handleAuthError, passwordSignUpValSchema, confirmPasswordSchema } from '../../../utils';

import './../commonStyles.css';
import styles from './UpdatePassword.module.css';

function UpdatePassword() {
    const dispatch = useDispatch();
    const { error, isRecovered } = useSelector((state: AppState) => state.authReducer);

    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');
    const validationSchema = Yup.object().shape({
        password: passwordSignUpValSchema,
        confirmPassword: confirmPasswordSchema
    });

    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    }, []);

    return isRecovered ? (
        <Navigate to="/update-password-redirect" />
    ) : (
        <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={values => {
                dispatch(
                    passwordUpdateRequest({
                        password: values.password,
                        oobCode
                    })
                );
            }}
        >
            <Form className="wrapper">
                <h1>Update password</h1>

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
            </Form>
        </Formik>
    );
}

export default UpdatePassword;
