import { Provider, useSelector } from 'react-redux';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './redux/store';
import { appRouter, loginRouter } from './router';

import './App.scss';

function App() {
    const user = useSelector((state: AppState) => state.authReducer.user);
    console.log(user);

    return (
        <>
            <RouterProvider router={user.uid ? appRouter : loginRouter} />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
        </>
    );
}

export default App;
