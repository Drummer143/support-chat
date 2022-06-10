import * as Yup from 'yup';
import YupPassword from 'yup-password';

export const handleAuthError = error => {
    switch (error.code) {
        case 'auth/user-not-found':
            return 'ERROR: User with entered email was not found';
        case 'auth/wrong-password':
            return 'ERROR: Invalid password.';
        case 'auth/too-many-requests':
            return 'ERROR: Exceeded the number of login attempts. Check your email and password and try to login later.';

        case 'auth/email-already-in-use':
            return 'ERROR: This email is already in use. Use an another email or try to login';

        case 'auth/invalid-email':
            return 'ERROR: Invalid email. Example: example@mail.com';

        default:
            return 'Unexpected error. Contact support to solve the problem or try again later.';
    }
};

YupPassword(Yup);

export const emailSignInValSchema = Yup.string().required('This field is required');
export const emailSignUpValSchema = Yup.string()
    .email('Invalid address. Example: suppurt-chat@example.com')
    .required('This field is required');

export const passwordSignInValSchema = Yup.string().required('This field is required');
export const passwordSignUpValSchema = Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(20, 'Must be 20 characters or less')
    .minUppercase(1, 'Your password must contain at least one uppercase letter')
    .minLowercase(1, 'Your password must contain at least one lowercase letter')
    .minNumbers(1, 'Your password must contain at least one number')
    .required('This field is required');

export const confirmPasswordSchema = Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('This field is required');
