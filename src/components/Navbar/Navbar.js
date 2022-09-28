import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';

import { changeStatus } from '../../redux/actions/actions';

import styles from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Cell = ({ status, currStatus, icon, text, handleClick }) => {
    let style = styles.cell;
    if (currStatus === status) {
        style = `${style} ${styles.active}`;
    }

    return (
        <div className={style} onClick={() => handleClick(status)}>
            <p className={styles.heading}>{text}</p>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

function Navbar() {
    const currStatus = useSelector(state => state.chatReducer.status);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = status => {
        if (currStatus !== status) {
            dispatch(changeStatus(status));
        }
        if (pathname !== '/main/dialogs') {
            navigate('/main/dialogs');
        }
    };

    return (
        <nav className={styles.wrapper}>
            <Cell
                status="active"
                currStatus={currStatus}
                icon={faHourglass}
                text="Active"
                handleClick={handleClick}
            />
            <Cell
                status="completed"
                currStatus={currStatus}
                icon={faCheck}
                text="Completed"
                handleClick={handleClick}
            />
            <Cell
                status="saved"
                currStatus={currStatus}
                icon={faFloppyDisk}
                text="Saved"
                handleClick={handleClick}
            />
        </nav>
    );
}

export default Navbar;
