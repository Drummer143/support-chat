import { v4 } from 'uuid';
import { useState, useEffect } from 'react';
import { ref as dRef, update } from 'firebase/database';
import { ref as sRef, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import InputFileButton from './../../InputFileButton/InputFileButton';
import { DialogStatus, DynamicObject } from '../../../types/types';
import { database, storage } from '../../../firebase';

import styles from './InputForm.module.css';

type Props = {
    input: string
    setInput: (value: string) => void;
    id: string
    dialogId: number
    status: DialogStatus
}

function InputForm({ input, setInput, id, dialogId, status }: Props) {
    const [localInput, setLocalInput] = useState(input);
    const [imageInput, setImageInput] = useState<File | null>();

    useEffect(() => setLocalInput(input), [input]);

    const dbRef = dRef(database);

    const uploadImage = () => {
        if (!imageInput) return;
        const imageRef = sRef(storage, `d${dialogId}/m${id}/${imageInput.name}_${v4()}`);
        uploadBytes(imageRef, imageInput).then(() => {
            const imageRef = sRef(storage, `d${dialogId}/m${id}`);
            listAll(imageRef).then(res => {
                getDownloadURL(res.items[0]).then(url => {
                    const message = {
                        content: localInput,
                        timestamp: date.getTime(),
                        image: url,
                        writtenBy: 'client'
                    };
                    let updates: DynamicObject = {};       // TODO: ADD TYPES
                    updates[`/dialogs/${dialogId}/messages/${id}/`] = message;
                    update(dbRef, updates);
                });
            });
        });
    };

    const date = new Date();

    const sendMessage = () => {
        const message = {
            content: localInput,
            timestamp: date.getTime(),
            writtenBy: 'client'
        };
        let updates: DynamicObject = {};       // TODO: ADD TYPE
        updates[`/dialogs/${dialogId}/messages/${id}`] = message;
        update(dbRef, updates);
    };

    const isDisabled = status === 'completed' ? true : false;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (imageInput) {
                    uploadImage();
                    setImageInput(null);
                } else if (localInput) {
                    sendMessage();
                }
                setInput('');
            }}
            onReset={() => setInput('')}
            className={styles.wrapper}
            style={{ cursor: isDisabled ? 'not-allowed' : 'auto' }}
        >
            <div className={styles.inputField}>
                <textarea
                    name="input"
                    onChange={e => setInput(e.target.value)}
                    value={localInput}
                    className={styles.textarea}
                    maxLength={1000}
                    placeholder="Write a message..."
                    disabled={isDisabled}
                />

                <InputFileButton setImageInput={setImageInput} isDisabled={isDisabled} />
            </div>
            <div className={styles.buttons}>
                <button
                    type="reset"
                    className={`${styles.button} ${styles.clear}`}
                    disabled={isDisabled}
                >
                    Clear
                </button>

                <button
                    type="submit"
                    className={`${styles.button} ${styles.submit}`}
                    disabled={isDisabled}
                >
                    Send
                </button>
            </div>
        </form>

        /* <form
            onSubmit={e => {
                e.preventDefault();
                console.log(imageInput);
            }}
        >
            <InputFileButton setImageInput={setImageInput} />
            <button type='submit' onClick={uploadImage}>Upload</button>
        </form> */
    );
}

export default InputForm;
