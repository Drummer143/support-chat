import { faPaperclip } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

import {  ReactComponent as PaperClip } from '../../assets/PaperClip.svg';

import styles from './InputFileButton.module.css';

type Props = {
    isDisabled: boolean
    setImageInput: Function

    text?: string
    buttonShape?: string
}

function InputFileButton({ setImageInput, isDisabled = false, text = '', buttonShape = 'circle' }: Props) {
    const imageInput = useRef<HTMLInputElement>(null);
    const style = buttonShape === 'circle' ? 'circle' : 'button';

    return (
        <div className={styles.imageInput}>
            <input
                ref={imageInput}
                type="file"
                id="fileInput"
                multiple={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files) {
                        const a = e.target.files[0];
                        setImageInput(e.target.files[0]);
                    }
                }
                }
                accept="image/jpeg,image/png"
                style={{ display: 'none' }}
            />

            <button
                type="button"
                onClick={() => imageInput?.current?.click()}
                disabled={isDisabled}
                className={styles[style]}
            >
                {text || <PaperClip width='25' height='30' style={{ marginTop: '4px' }} /> /* <FontAwesomeIcon icon={faPaperclip} /> */}
            </button>
        </div>
    );
}

export default InputFileButton;
