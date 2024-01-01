import React from 'react'
import { Link } from 'react-router-dom';

const CreateButton = () => {
    return (
        <Link to="/create/">
            <button>Add new</button>
        </Link>
    )
}

export default CreateButton