import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to='/' className='home-link'>
        <h2>½Password</h2>
      </Link>
    </header>
  )
}

export default Header