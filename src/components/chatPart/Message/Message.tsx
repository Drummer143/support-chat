import Moment from 'react-moment';
import { useEffect, useState } from 'react';

import { DataMessage } from '../../../types/firebaseDataTypes';

import styles from './Message.module.css';

type Props = {
    message: DataMessage;
};

function Message({ message }: Props) {
    return (
        <div className={`${styles.message} ${styles[message.writtenBy]}`}>
            {message.content ? <p className={styles.text}>{message.content}</p> : null}
            {message.image ? (
                <img
                    src={message.image}
                    width="250"
                    alt="something wrong"
                    style={{ borderRadius: '5px' }}
                />
            ) : null}
            <p>
                <Moment fromNow className={styles.time}>
                    {message.timestamp}
                </Moment>
            </p>
        </div>
    );
}

export default Message;
