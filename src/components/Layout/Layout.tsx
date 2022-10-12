import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataSnapshot } from '@firebase/database';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Navbar from '../SideBar/SideBar';
import useLoadData from '../../hooks/useLoadData';
import { auth } from '../../firebase';
import { getDialogsSuccess } from '../../redux/actions/actions';

import styles from './Layout.module.css';

function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const [token, setToken] = useState(); */
    const { pathname } = useLocation();

    useLoadData('dialogs/', (snapshot: DataSnapshot) =>
        dispatch(getDialogsSuccess(snapshot.val()))
    );

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                /*  user.getIdToken(true).then(latestToken => setToken(latestToken));
             } else { */
                navigate('/error');
            }

            if (pathname === '/main' || pathname === '/main/') {
                navigate('/main/dialogs');
            }
        });
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Header />
            </div>

            <div className={styles.navbar}>
                <Navbar />
            </div>

            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
