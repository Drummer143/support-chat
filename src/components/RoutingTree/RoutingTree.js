import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Chat from '../chatPart/Chat/Chat';
import Layout from '../Layout/Layout';
import SignInForm from '../authPart/SignInForm/SignInForm';
import SignUpForm from '../authPart/SignUpForm/SignUpForm';
import ReAuthError from '../listOfDialogsPart/ReAuthError/ReAuthError';
import SettingsLayout from '../settingsPart/SettingsLayout/SettingsLayout';
import ForgotPassword from '../authPart/ForgotPassword/ForgotPassword';
import UpdatePassword from '../authPart/UpdatePassword/UpdatePassword';
import ListOfDialogs from '../listOfDialogsPart/ListOfDialogs/ListOfDialogs';
import ForgotPasswordRedirect from '../authPart/ForgotPasswordRedirect/ForgotPasswordRedirect';
import UpdatePasswordRedirect from '../authPart/UpdatePasswordRedirect/UpdatePasswordRedirect';
import UserSettings from '../settingsPart/UserSettings/UserSettings';
import DialogSettings from '../settingsPart/DialogSettings/DialogSettings';

function RoutingTree() {
    const user = useSelector(state => state.authReducer.user);

    return user ? (
        <Routes>
            <Route path="/main/" element={<Layout />}>
                <Route path="dialogs" element={<ListOfDialogs />} />
                <Route path="dialog/:id" element={<Chat />} />
            </Route>
            <Route path="settings/" element={<SettingsLayout />}>
                <Route path='profile' element={<UserSettings />} />
                <Route path='dialog' element={<DialogSettings />} />
            </Route>

            <Route path="/error" element={<ReAuthError />} />
            <Route path="/*" element={<Navigate to="/main/dialogs" replace />} />
        </Routes>
    ) : (
        <Routes>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password-redirect" element={<ForgotPasswordRedirect />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-password-redirect" element={<UpdatePasswordRedirect />} />
            <Route path="/*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
    );
}

export default RoutingTree;
