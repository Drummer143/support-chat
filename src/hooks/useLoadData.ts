import { useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';

import { database } from '../firebase';

const useLoadData = (path: string, handleData: Function) => {
    const dbRef = ref(database, path);

    useEffect(() => {
        onValue(dbRef, snapshot => handleData(snapshot));

        return () => {
            off(dbRef);
        };
    });
};

export default useLoadData;
