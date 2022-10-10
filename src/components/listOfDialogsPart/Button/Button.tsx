import { ref } from 'firebase/database';
import { update } from 'firebase/database';

import { database } from '../../../firebase';
import { DialogStatus, DynamicObject } from '../../../types/types';

import styles from './Button.module.css';

type Props = {
    dialogId: number;
    path: string;
    newStatus: DialogStatus | boolean;
    text: string;
    buttonColor: string;
};

const Button = ({ text, dialogId, newStatus, path, buttonColor }: Props) => {
    const headDB = ref(database);

    const setNewStatus = (dialogId: number, newStatus: DialogStatus | boolean, path: string) => {
        let updates: DynamicObject = {};
        updates[`/dialogs/${dialogId}/${path}/`] = newStatus;
        update(headDB, updates);
        /* TODO: update operatorId */
    };

    return (
        <button
            className={`${styles.button} ${styles[buttonColor]}`}
            onClick={() => setNewStatus(dialogId, newStatus, path)}
        >
            {text}
        </button>
    );
};

export default Button;
