import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({entries}) => {
  return (
    <Link to={`/passwords/${entries.id}`} className='list-item'>
      <h3>{entries.name}</h3>
    </Link>
  )
}

export default ListItem