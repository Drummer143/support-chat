import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
