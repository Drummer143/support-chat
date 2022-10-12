import React, { useEffect, useRef, useState } from 'react';

import styles from './Snippet.module.css';

type Props = {
    text: string;
    currentEditingSnippet: string;

    handleEditButtonClick: Function;
    handleDelete: Function;
    handleSave: Function;
};

const Snippet = ({
    text,
    currentEditingSnippet,
    handleEditButtonClick,
    handleDelete,
    handleSave
}: Props) => {
    const [isDisabled, setDisabled] = useState(true);
    const [input, setInput] = useState(text);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isRightShiftHolding, setIsRightShiftHolding] = useState(false);

    const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.removeAttribute('style');
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleCancel = () => {
        setInput(text);
        handleEditButtonClick('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'ShiftLeft') {
            setIsRightShiftHolding(true);
        }

        if (e.key === 'Enter' && !isRightShiftHolding) {
            e.preventDefault();
            handleSave(e, text, input);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Shift') {
            setIsRightShiftHolding(false);
        }
    };

    useEffect(() => {
        if (currentEditingSnippet === text) {
            setDisabled(false);
            setTimeout(() => inputRef.current?.focus());
        } else {
            setDisabled(true);
            setInput(text);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEditingSnippet]);

    return (
        <form className={styles.wrapper}>
            <textarea
                value={input}
                ref={inputRef}
                onChange={e => {
                    setInput(e.target.value);
                    resize(e);
                }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                // onBlur={handleCancel}
                disabled={text ? isDisabled : true}
                className={styles.textarea}
                onFocus={e => (e.target.selectionStart = e.target.value.length)}
            />
            <div>
                {isDisabled ? (
                    <>
                        <button
                            type="button"
                            onClick={() => handleEditButtonClick(text)}
                            className={`${styles.button} ${styles.greenButton}`}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(text)}
                            className={`${styles.button} ${styles.redButton}`}
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={e => handleSave(e, text, input)}
                            className={`${styles.button} ${styles.greenButton}`}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={`${styles.button} ${styles.redButton}`}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default Snippet;
