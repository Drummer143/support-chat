import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ref, onValue, off } from 'firebase/database';

import { database } from '../../firebase';
import { getDataSuccess } from '../../redux/actions/actions';

const useUpdateDialogs = () => {
    const dispatch = useDispatch();

    const dbRef = ref(database, 'dialogs/');

    const getDialogs = () => onValue(dbRef, snapshot => dispatch(getDataSuccess(snapshot.val())));

    useEffect(() => {
        getDialogs();
        return () => off(dbRef);
    }, []);
};

export default useUpdateDialogs;
