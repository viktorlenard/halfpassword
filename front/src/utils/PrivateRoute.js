import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    console.log('PrivateRoute rendered');
    const navigate = useNavigate();

    let { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate('/login/');
        }
    }, [user, navigate]); // dependencies of the effect

    if (!user) {
        return null;
    }

    return children;
};

export default PrivateRoute;