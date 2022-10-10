import mapRating from './mapRating';

import Button from '../Button/Button';
import { DataDialog } from '../../../types/firebaseDataTypes';

import styles from './DialogCell.module.css';

const useButtons = ({ dialogId, status, saved, rating }: DataDialog) => {
    let ratingComponents: JSX.Element | JSX.Element[] | null = null;
    if (status === 'completed') {
        ratingComponents = mapRating(rating);
    }

    const buttons = {
        complete: (
            <Button
                dialogId={dialogId}
                buttonColor="complete"
                newStatus="completed"
                path="status"
                text="Complete dialog"
            />
        ),
        save: (
            <Button
                dialogId={dialogId}
                buttonColor="save"
                newStatus={true}
                path="saved"
                text="Save dialog"
            />
        ),
        deleteFromSaved: (
            <Button
                dialogId={dialogId}
                buttonColor="delete"
                newStatus={false}
                path="saved"
                text="Delete from saved"
            />
        ),
        enterDialog: (
            <Button
                dialogId={dialogId}
                buttonColor="accept"
                newStatus="active"
                path="status"
                text="Accept dialog"
            />
        )
    };

    switch (status) {
        case 'active': {
            return {
                first: buttons.complete,
                second: saved ? buttons.deleteFromSaved : buttons.save
            };
        }
        case 'completed': {
            return {
                first: (
                    <div className={`${styles.button} ${styles.rating}`}>{ratingComponents}</div>
                ),
                second: saved ? buttons.deleteFromSaved : buttons.save
            };
        }
        case 'queue': {
            return {
                first: buttons.enterDialog,
                second: ''
            };
        }

        default: {
            return {
                first: '',
                second: ''
            };
        }
    }
};

export default useButtons;
