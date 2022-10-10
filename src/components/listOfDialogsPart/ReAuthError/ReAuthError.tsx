import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOutRequest } from '../../../redux/actions/actions';

import styles from './ReAuthError.module.css';

function ReAuthError() {
    const dispatch = useDispatch();

    return (
        <div className={styles.wrapper}>
            <p>Something wrong with your account. Try login again</p>

            <p>
                Go to login{' '}
                <NavLink
                    to="/"
                    onClick={() => {
                        dispatch(signOutRequest());
                    }}
                    className={styles.link}
                >
                    page
                </NavLink>
            </p>
        </div>
    );
}

export default ReAuthError;
