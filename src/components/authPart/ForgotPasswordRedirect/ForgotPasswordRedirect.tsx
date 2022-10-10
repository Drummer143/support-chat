import { NavLink } from 'react-router-dom';

import './../commonStyles.css';
import styles from './ForgotPasswordRedirect.module.css';

function ForgotPasswordRedirect() {
    return (
        <div className="wrapper">
            <p>Check your email and follow the link we sent to restore your account password</p>

            <p>
                It may take several minutes to deliver it. And don't forget to check the spam
                folders
            </p>

            <p>
                Go to{' '}
                <NavLink to="/" className={styles.footerLink}>
                    login
                </NavLink>{' '}
                page{' '}
            </p>
        </div>
    );
}

export default ForgotPasswordRedirect;
