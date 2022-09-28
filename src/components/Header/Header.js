import { useDispatch, useSelector } from 'react-redux';

import { signOutRequest } from '../../redux/actions/actions';

import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.authReducer.user);

    return (
        <div className={styles.wrapper}>
            <button className={styles.info} onClick={() => navigate('/settings')}>
                <p>{user.displayName || user.email}</p>
            </button>

            <button
                className={styles.button}
                onClick={() => {
                    dispatch(signOutRequest());
                }}
            >
                Sign Out
            </button>
        </div>
    );
}

export default Header;
