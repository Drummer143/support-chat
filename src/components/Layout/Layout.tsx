import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Navbar from '../SideBar/SideBar';
import useUpdateDialogs from './useLoadDialogs';
import { auth } from '../../firebase';

import styles from './Layout.module.css';

function Layout() {
    const navigate = useNavigate();
    /* const [token, setToken] = useState(); */
    const { pathname } = useLocation();

    useUpdateDialogs();

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
