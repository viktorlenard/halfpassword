import React from 'react';

const ListItem = ({entries}) => {
  return (
    <div className='list-item'>
      <h3>{entries.name}</h3>
    </div>
  )
}

export default ListItem