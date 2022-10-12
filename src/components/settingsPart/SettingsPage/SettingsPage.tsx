import { AppState } from '../../../types/types';
import { DataSnapshot } from '@firebase/database';
import { getSnippetsSuccess } from '../../../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';

import Snippets from '../SnippetsList/SnippetsList';
import HomeButton from '../../HomeButton/HomeButton';
import useLoadData from './../../../hooks/useLoadData';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import { buildPathToSnippets } from '../../../utils';

import styles from './SettingsPage.module.css';

function SettingsPage() {
    const user = useSelector((state: AppState) => state.authReducer.user);
    const dispatch = useDispatch();

    useLoadData(buildPathToSnippets(user.uid), (snapshot: DataSnapshot) => {
        dispatch(getSnippetsSuccess(snapshot.val()));
    });

    return (
        <div className={styles.wrapper}>
            <header>
                <HomeButton />
                <h1>Settings</h1>
            </header>

            <main>
                <ProfileSettings />

                <Snippets />
            </main>
        </div>
    );
}

export default SettingsPage;
