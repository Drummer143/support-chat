import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

import Body from '../Body/Body';

import styles from './MainPage.module.css';
import Header from './../Header/Header';
import Navbar from '../Navbar/Navbar';
import Chat from '../Chat/Chat';

function MainPage() {
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [statusKey, setStatusKey] = useState('active');

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken(true).then((latestToken) => setToken(latestToken));
            } else {
                navigate('/error');
            }
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header />
            </header>

            <aside className={styles.navbar}>
                <Navbar statusKey={statusKey} setStatusKey={setStatusKey} />
            </aside>

            <div className={styles.Body}>
                <Routes>
                    <Route path='/' element={<Body statusKey={statusKey} />} />
                    <Route path='/:id' element={<Chat />} />
                </Routes>
                
            </div>
        </div>
    );
}

export default MainPage;
