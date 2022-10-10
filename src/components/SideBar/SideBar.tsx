import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';

import SideBarButton from './../SideBarButton/SideBarButton';
import { AppState } from '../../types/types';
import { changeStatus } from '../../redux/actions/actions';

function SideBar() {
    const currentStatus = useSelector((state: AppState) => state.chatReducer.status);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const cells = [
        {
            status: 'active',
            icon: faHourglass
        },
        {
            status: 'completed',
            icon: faCheck
        },
        {
            status: 'saved',
            icon: faFloppyDisk
        }
    ];

    const handleClick = (status: string) => {
        if (currentStatus !== status) {
            dispatch(changeStatus(status));
        }
        if (pathname !== '/main/dialogs') {
            navigate('/main/dialogs');
        }
    };

    return (
        <nav>
            {cells.map(({ status, icon }) => <SideBarButton key={status} status={status} currentStatus={currentStatus} icon={icon} text={status.replace(status[0], status[0].toLowerCase())} handleClick={handleClick} />)}
        </nav>
    );
}

export default SideBar;
