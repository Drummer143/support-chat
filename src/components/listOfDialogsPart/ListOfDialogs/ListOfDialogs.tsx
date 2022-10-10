import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import useGetData from './useFilterDialogs';
import DialogCell from '../DialogCell/DialogCell';
import { changeStatus } from '../../../redux/actions/actions';

import styles from './ListOfDialogs.module.css';
import { AppState } from '../../../types/types';

function ListOfDialogs() {
    const status = useSelector((state: AppState) => state.chatReducer.status);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [activeSearchParams, setActiveSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);
    const dialogs = useGetData(activeSearchParams);

    useEffect(() => setCountOfDialogs(10), [activeSearchParams, status]);

    useEffect(() => debounce(() => setActiveSearchParams(searchInput), 500), [searchInput]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.panel}>
                {status === 'queue' ? (
                    <div className={styles.queue}>Dialogs in queue: {dialogs?.length}</div>
                ) : (
                    <button
                        onClick={() => dispatch(changeStatus('queue'))}
                        className={styles.queueButton}
                    >
                        Load queue
                    </button>
                )}

                <SearchBar input={searchInput} setInput={setSearchInput} />
            </div>

            <div className={styles.list}>
                {dialogs?.length ? (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => {}}
                        hasMore={countOfDialogs < dialogs.length}
                        loader={
                            <div className={styles.loadMoreField}>
                                <button
                                    onClick={() => setCountOfDialogs(prev => prev + 10)}
                                    className={styles.loadMore}
                                >
                                    Click here to load more
                                </button>
                            </div>
                        }
                    >
                        {dialogs.slice(0, countOfDialogs).map(dialog => (
                            <DialogCell key={dialog.dialogId} dialog={dialog} />
                        ))}
                    </InfiniteScroll>
                ) : (
                    <p className={styles.empty}>The list is empty.</p>
                )}
            </div>
        </div>
    );
}

export default ListOfDialogs;
