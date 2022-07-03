import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { useNavigate } from 'react-router-dom';

import styles from './HomeButton.module.css';

function HomeButton({ width, height }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate('/main/dialogs')}
            className={styles.back}
            data-title="Go to main page"
            style={{
                width: width || '50px',
                height: height || '50px'
            }}
        >
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        </button>
    );
}

export default HomeButton;
