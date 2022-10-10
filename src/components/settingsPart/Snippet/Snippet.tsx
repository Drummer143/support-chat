import React, { useState } from 'react';

import styles from './Snippet.module.css';

type Props = {
    text: string;
    handleDelete: any;
    handleSave: any;
};

const Snippet = ({ text, handleDelete, handleSave }: Props) => {
    const [isDisabled, setDisabled] = useState(true);
    const [input, setInput] = useState(text);

    return (
        <div className={styles.wrapper}>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={text ? isDisabled : true}
                className={styles.textarea}
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                    (e.target.selectionStart = e.target.value.length)
                }
            />
            <div>
                <button
                    onClick={() => handleSave(text, input, setDisabled)}
                    className={`${styles.button} ${styles.greenButton}`}
                >
                    {isDisabled ? 'Edit' : 'Save'}
                </button>
                {!isDisabled || (
                    <button
                        type="button"
                        onClick={() => handleDelete(text)}
                        className={`${styles.button} ${styles.redButton}`}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default Snippet;
