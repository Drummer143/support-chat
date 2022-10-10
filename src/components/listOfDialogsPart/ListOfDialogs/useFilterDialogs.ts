import { useSelector } from 'react-redux';

import { AppState } from '../../../types/types';
import { DataDialog } from '../../../types/firebaseDataTypes';

const useGetData = (searchParams: string) => {
    const status = useSelector((state: AppState) => state.chatReducer.status);
    const dialogs = useSelector((state: AppState) => state.chatReducer.dialogs);

    const inputFilter = (dialog: DataDialog) => {
        return (
            dialog.userName.toLowerCase().includes(searchParams.toLowerCase()) ||
            dialog.messages.find(message =>
                message.content?.toLowerCase().includes(searchParams.toLowerCase())
            )
        );
    };

    const statusFilter = (dialog: DataDialog) => {
        if (status === 'saved') {
            return dialog.saved;
        } else {
            return dialog.status === status;
        }
    };

    if (dialogs) {
        return dialogs.filter(dialog => inputFilter(dialog) && statusFilter(dialog));
    }
};

export default useGetData;
