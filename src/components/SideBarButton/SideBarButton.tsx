import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SideBarButton.module.css';

type Props = {
    status: string
    currentStatus: string
    icon: any
    text: string
    handleClick: (status: string) => void
}

const SideBarButton = ({ status, currentStatus, icon, text, handleClick }: Props) => {
    let style = styles.cell;
    if (currentStatus === status) {
        style = `${style} ${styles.active}`;
    }

    return (
        <div className={style} onClick={() => handleClick(status)}>
            <p className={styles.heading}>{text}</p>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

export default SideBarButton;