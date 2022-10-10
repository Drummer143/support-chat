import Snippets from '../Snippets/Snippets';
import HomeButton from '../../HomeButton/HomeButton';
import ProfileSettings from '../ProfileSettings/ProfileSettings';

import styles from './SettingsPage.module.css';

function SettingsPage() {
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
