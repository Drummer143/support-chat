import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as ArrowLeft } from '../../assets/ArrowLeft.svg';

import styles from './HomeButton.module.css';

type Props = {
    width?: number | null;
    height?: number | null;
};

function HomeButton({ width = null, height = null }: Props) {
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
            <ArrowLeft className={styles.icon} />
        </button>
    );
}

export default HomeButton;
