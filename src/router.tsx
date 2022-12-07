import { Navigate, createBrowserRouter } from 'react-router-dom';

import Chat from './components/chatPart/Chat/Chat';
import Layout from './components/Layout/Layout';
import SignInForm from './components/authPart/SignInForm/SignInForm';
import SignUpForm from './components/authPart/SignUpForm/SignUpForm';
import ReAuthError from './components/listOfDialogsPart/ReAuthError/ReAuthError';
import ListOfDialogs from './components/listOfDialogsPart/ListOfDialogs/ListOfDialogs';
import ForgotPassword from './components/authPart/ForgotPassword/ForgotPassword';
import UpdatePassword from './components/authPart/UpdatePassword/UpdatePassword';
import SettingsPage from './components/settingsPart/SettingsPage/SettingsPage';
import ForgotPasswordRedirect from './components/authPart/ForgotPasswordRedirect/ForgotPasswordRedirect';
import UpdatePasswordRedirect from './components/authPart/UpdatePasswordRedirect/UpdatePasswordRedirect';

const loginRouter = createBrowserRouter([
    {
        path: '/sign-in', element: < SignInForm />
    },
    {
        path: '/sign-up', element: < SignUpForm />
    },
    {
        path: '/forgot-password', element: < ForgotPassword />
    },
    {
        path: '/forgot-password-redirect', element: < ForgotPasswordRedirect />
    },
    {
        path: '/update-password', element: < UpdatePassword />
    },
    {
        path: '/update-password-redirect', element: < UpdatePasswordRedirect />
    },
    {
        path: '/*', element: <Navigate to="/sign-in" replace />
    },
])

const appRouter = createBrowserRouter([
    {
        path: '/main',
        element: <Layout />,
        children: [
            {
                path: '/main/dialogs',
                element: <ListOfDialogs />
            },
            {
                path: '/main/dialog/:id',
                element: <Chat />
            }
        ]
    },
    {
        path: '/settings', element: <SettingsPage />
    },
    {
        path: '/error', element: <ReAuthError />
    },
    {
        path: '/*', element: <Navigate to='/main/dialogs' replace />
    }
])

export { appRouter, loginRouter };