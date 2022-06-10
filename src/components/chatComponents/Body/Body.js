import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { database } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ref, onValue, query, orderByChild, startAt, endAt, off } from 'firebase/database';

import SearchBar from '../SearchBar/SearchBar';
import DialogListCell from '../DialogListCell/DialogListCell';

import styles from './Body.module.css';

const createPath = status => {
    const queryParams = {
        path: status === 'saved' ? 'saved' : 'status',
        status: status === 'saved' ? true : status
    };

    const dbRef = query(
        ref(database, 'dialogs/'),
        orderByChild(queryParams.path),
        startAt(queryParams.status),
        endAt(queryParams.status)
    );

    return dbRef;
};

function Body() {
    const status = useSelector(state => state.chatReducer.status);
    const [dialogs, setDialogs] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [activeSearchParams, setActiveSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);

    const dbRef = createPath(status);

    const getDialogs = dbRef => {
        onValue(dbRef, snapshot => {
            let array;
            snapshot.forEach(child => {
                let obj = child.val();
                obj.dialogId = child.key;
                if (array) {
                    array.push(obj);
                } else {
                    array = [obj];
                }
            });
            setDialogs(array);
        });
    };

    useEffect(() => {
        getDialogs(dbRef);
    }, [status]);

    useEffect(() => setCountOfDialogs(10), [activeSearchParams, status]);

    useEffect(
        debounce(() => setActiveSearchParams(enteredSearchParams), 500),
        [enteredSearchParams]
    );

    const filterDialogs = () => {
        const inputFilter = dialog => {
            return (
                dialog.userName.toLowerCase().includes(activeSearchParams.toLowerCase()) ||
                dialog.messages.find(message =>
                    message.content.toLowerCase().includes(activeSearchParams.toLowerCase())
                )
            );
        };

        if (activeSearchParams) {
            return dialogs
                .filter(dialog => inputFilter(dialog))
                .map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} />);
        } else {
            return dialogs.map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} />);
        }
    };

    if (dialogs) {
        var results = filterDialogs();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBar}>
                <SearchBar value={enteredSearchParams} setValue={setEnteredSearchParams} />
            </div>

            <div className={styles.list}>
                {results ? (
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={countOfDialogs < results.length}
                        loader={
                            <div className={styles.loadMoreField}>
                                <button
                                    onClick={() => setCountOfDialogs(countOfDialogs + 10)}
                                    className={styles.loadMore}
                                >
                                    Click here to load more
                                </button>
                            </div>
                        }
                        loadMore={getDialogs}
                    >
                        {results.slice(0, countOfDialogs)}
                    </InfiniteScroll>
                ) : (
                    <p className={styles.empty}>The list is empty.</p>
                )}
            </div>
        </div>
    );
}

export default Body;
