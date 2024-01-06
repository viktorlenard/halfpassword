import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  
  const {user, logoutUser} = useContext(AuthContext);
  const location = useLocation();

  return (
    <header>
      <Link to='/' className='home-link'>
        <h2>½Password</h2>
      </Link>
      {user ? (
        <button onClick={logoutUser}>Logout {user.username}</button>
      ) : (
        <div>
          {location.pathname !== '/login/' && (
            <Link to='/login/' className='home-link'>
              <h2>Login</h2>
            </Link>
          )}
          {location.pathname !== '/register/' && (
            <Link to='/register/' className='home-link'>
              <h2>Register</h2>
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header