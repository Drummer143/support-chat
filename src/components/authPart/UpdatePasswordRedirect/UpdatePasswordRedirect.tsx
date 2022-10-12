import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './../commonStyles.css';

function UpdatePasswordRedirect() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setTimer(setTimeout(() => navigate('/'), 10000));

        return () => clearTimeout(timer);
    });

    return (
        <div className="wrapper">
            <p>Your password has been successfully changed</p>
            <p>You will be redirected to authentication page soon</p>
        </div>
    );
}

export default UpdatePasswordRedirect;
