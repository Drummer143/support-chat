import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './UpdateProfileForm.module.css';
import { DynamicObject } from '../../../types/types';
import React from 'react';

type Props = {
    heading: string;
    values: DynamicObject;
    validationSchema: DynamicObject
    fields: string[];
    types: string[];
    handleSubmit: Function;
};

function UpdateProfileForm({ heading, fields, types, validationSchema, values, handleSubmit }: Props) {
    return (
        <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
        >
            <Form className={styles.form}>
                <h3>{heading}</h3>
                {fields.map((field, i) => (
                    <React.Fragment key={field}>
                        <Field type={types[i]} name={field} />
                        <p>
                            <ErrorMessage name={field} />
                        </p>
                    </React.Fragment>
                ))}
            </Form>
        </Formik>
    );
}

export default UpdateProfileForm;
