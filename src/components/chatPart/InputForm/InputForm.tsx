import { v4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { ref as dRef, update } from 'firebase/database';
import { ref as sRef, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import InputFileButton from './../../InputFileButton/InputFileButton';
import { DialogStatus } from '../../../types/types';
import { database, storage } from '../../../firebase';
import { buildPathToMessages } from '../../../utils';

import styles from './InputForm.module.css';

type Props = {
    input: string;
    setInput: (value: string) => void;
    id: string;
    dialogId: string;
    status: DialogStatus;
};

function InputForm({ input, setInput, id, dialogId, status }: Props) {
    const [localInput, setLocalInput] = useState(input);
    const [imageInput, setImageInput] = useState<File | null>(null);
    const [isRightShiftHolding, setIsRightShiftHolding] = useState(false);

    const isDisabled = status === 'completed' ? true : false;
    const dbRef = dRef(database);

    useEffect(() => setLocalInput(input), [input]);

    const uploadImage = () => {
        if (!imageInput) return;
        const imageRef = sRef(storage, `d${dialogId}/m${id}/${imageInput.name}_${v4()}`);
        uploadBytes(imageRef, imageInput).then(() => {
            const imageRef = sRef(storage, `d${dialogId}/m${id}`);

            listAll(imageRef).then(res => {
                getDownloadURL(res.items[0]).then(url => {
                    const message = {
                        content: localInput,
                        timestamp: (new Date()).getTime(),
                        image: url,
                        writtenBy: 'operator'
                    };
                    update(dbRef, { [buildPathToMessages(dialogId, 'messages', id)]: message });
                });
            });
        });
    };

    const sendMessage = () => {
        const message = {
            content: localInput,
            timestamp: (new Date()).getTime(),
            writtenBy: 'operator'
        };
        update(dbRef, { [buildPathToMessages(dialogId, 'messages', id)]: message });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e?.preventDefault();
        if (imageInput) {
            uploadImage();
            setImageInput(null);
        } else {
            const text = localInput.trim();
            if (text) {
                sendMessage();
            }
        }
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'ShiftLeft') {
            setIsRightShiftHolding(true);
        }

        if (e.key === 'Enter' && !isRightShiftHolding) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'ShiftLeft') {
            setIsRightShiftHolding(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            onReset={() => setInput('')}
            className={styles.wrapper}
            style={{ cursor: isDisabled ? 'not-allowed' : 'auto' }}
        >
            <div className={styles.inputField}>
                <textarea
                    name="input"
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
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
    );
}

export default InputForm;
