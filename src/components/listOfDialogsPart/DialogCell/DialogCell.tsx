import moment from 'moment';
import { NavLink } from 'react-router-dom';

import useButtons from './useButtons';
import { DataDialog } from '../../../types/firebaseDataTypes';

import styles from './DialogCell.module.css';

type Props = {
    dialog: DataDialog;
};

function DialogCell({ dialog }: Props) {
    const lastMessage = dialog.messages[dialog.messages.length - 1];
    const currButtonSet = useButtons(dialog);

    return (
        <div className={styles.wrapper}>
            <NavLink to={'/main/dialog/' + dialog.dialogId} className={styles.dialogInfo}>
                <div className={styles.head}>
                    <p className={styles.text}>{dialog.userName}</p>
                    <p className={styles.text}>
                        Last message was sent{' '}
                        <time className={styles.time}>
                            {moment(lastMessage.timestamp).fromNow()}
                        </time>
                    </p>
                </div>

                <p className={styles.message}>
                    <strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}
                </p>
            </NavLink>

            <div className={styles.buttons}>
                {currButtonSet.first}
                {currButtonSet.second}
            </div>
        </div>
    );
}

export default DialogCell;
