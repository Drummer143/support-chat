import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { PersistState } from 'redux-persist';
import { DataDialog } from './firebaseDataTypes';

declare global {
    type AuthState = {
        requesting: boolean;
        user: User;
        error: null | FirebaseError;
        isRecovered?: boolean;
    };

    type ChatState = {
        status: string;
        dialogs: DataDialog[];
        snippets: string[];
    };

    type Action = {
        type?: string;
        error?: FirebaseError;
        status?: string;
        dialogs?: DataDialog[];
        snippets?: string[];
        email?: string;
        password?: string;
        oobCode?: string | null;
    };

    type AppState = {
        authReducer: AuthState;
        chatReducer: ChatState;
        _persist: PersistState;
    };

    type DialogStatus = 'completed' | 'active' | 'queue';

    type DynamicObject = {
        [key: string]: any;
    };
}

export { };