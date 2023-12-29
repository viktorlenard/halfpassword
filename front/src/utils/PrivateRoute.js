import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();

  let { user } = useContext(AuthContext);

  if (!user) {
    navigate('/login');
    return null;
  }

  return children;
};

export default PrivateRoute;