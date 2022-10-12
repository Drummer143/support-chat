import { all } from 'redux-saga/effects';

import watcherAuth from './authSaga';
/* import watcherChat from './chatSaga'; */

function* rootSaga() {
    yield all([watcherAuth()]);
}

export default rootSaga;
