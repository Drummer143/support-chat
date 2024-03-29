import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

import Message from '../Message/Message';
import InputForm from '../InputForm/InputForm';
import HomeButton from '../../HomeButton/HomeButton';
import SnippetPanel from '../SnippetPanel/SnippetPanel';
import { DataDialog } from '../../../types/firebaseDataTypes';

import styles from './Chat.module.css';
import { AppState } from '../../../types/types';

type URLParams = {
    id: string;
};

function Chat() {
    const { id } = useParams<URLParams>();
    const dialog: DataDialog | undefined = useSelector((state: AppState) =>
        state.chatReducer.dialogs.find(dialog => dialog.dialogId?.toString() === id)
    );
    const [input, setInput] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    const addSnippet = (snippet: string) => setInput((input ? `${input} ` : '') + snippet);

    const messages = dialog?.messages.map((message, i) => (
        <Message key={`${i}${message}`} message={message} />
    ));

    useEffect(() => {
        if (chatRef.current?.scrollHeight) {
            chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
        }
    }, [chatRef.current?.scrollHeight]);

    return (
        <div className={styles.wrapper}>
            <HomeButton />

            <div className={styles.userInfo}>
                <h3>{dialog?.userName}</h3>
            </div>

            <div className={styles.rating}>{dialog?.rating}</div>

            <div className={styles.chat} id="chat" ref={chatRef}>
                {messages}
                {dialog?.status === 'completed' ? (
                    <div className={styles.lastMessage}>
                        Dialog is closed. You can only read the messages.
                    </div>
                ) : null}
            </div>

            <InputForm
                input={input}
                setInput={setInput}
                id={`${messages?.length}`}
                dialogId={dialog?.dialogId || '-1'}
                status={dialog?.status || 'queue'}
            />

            <SnippetPanel addSnippet={addSnippet} />
        </div>
    );
}

export default Chat;
