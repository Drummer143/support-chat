import moment from 'moment';

import { DataMessage } from '../../../types/firebaseDataTypes';

import styles from './Message.module.css';

type Props = {
    message: DataMessage;
};

function Message({ message }: Props) {
    return (
        <div className={`${styles.message} ${styles[message.writtenBy.startsWith('o') ? 'operator' : 'client']}`}>
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
                <time className={styles.time}>
                    {moment(message.timestamp).fromNow()}
                </time>
            </p>
        </div>
    );
}

export default Message;
