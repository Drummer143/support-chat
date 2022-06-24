import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonHome.module.css';

function ButtonHome() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate('/main/dialogs')}
            className={styles.back}
            data-title="Go to main page"
        >
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        </button>
    );
}

export default ButtonHome;