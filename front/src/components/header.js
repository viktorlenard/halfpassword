import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext);
  return (
    <header>
      <Link to='/' className='home-link'>
        <h2>½Password</h2>
      </Link>
      {user ?(
        <button onClick={logoutUser}>Logout {user.username}</button>
      ):(
        <div>
          <Link to='/login/' className='home-link'>
            <h2>Login</h2>
          </Link>
          <Link to='/register/' className='home-link'>
            <h2>Register</h2>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header