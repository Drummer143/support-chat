import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { FirebaseError } from 'firebase/app';

export const handleAuthError = (error: FirebaseError) => {
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

export const emailSignInValSchema = Yup.string().required('Required');
export const emailSignUpValSchema = Yup.string()
    .email('Invalid address. Example: suppurt-chat@example.com')
    .required('Required');

export const passwordSignInValSchema = Yup.string().required('Required');
export const passwordSignUpValSchema = Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(20, 'Must be 20 characters or less')
    .minUppercase(1, 'Your password must contain at least one uppercase letter')
    .minLowercase(1, 'Your password must contain at least one lowercase letter')
    .minNumbers(1, 'Your password must contain at least one number')
    .required('Required');

export const confirmPasswordValSchema = Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Required');

// schemas for settings

export const emailSchema = Yup.string().email('Invalid address. Example: suppurt-chat@example.com');

export const passwordSchema = Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(20, 'Must be 20 characters or less')
    .minUppercase(1, 'Your password must contain at least one uppercase letter')
    .minLowercase(1, 'Your password must contain at least one lowercase letter')
    .minNumbers(1, 'Your password must contain at least one number')
    .oneOf([Yup.ref('confirmPassword')], 'Passwords does not match');

export const confirmPasswordSchema = Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords does not match'
);

export const buildPathToMessages = (dialogId: string, field = 'messages', id = '') => {
    return `/dialogs/${dialogId}/${field}/${id}`;
}

export const buildPathToSnippets = (uid: string) => `supportsData/${uid}/snippets`;
