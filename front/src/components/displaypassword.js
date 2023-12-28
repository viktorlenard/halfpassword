import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import History from './history';

const DisplayPassword = ({ password, setIsEditing }) => {
    
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    let deletePassword = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            fetch(`/api/passwords/${password.id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/');
        }
    }

    return (
        <div>
            {/* Render 'NOT FOUND' if nothing comes back from the call */}
            <div className='entry-card'>
                {password ? (
                    <>
                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => deletePassword()}>Delete</button>
                    </div>
                    <div className='password-card'>
                        <label>
                            <h3>Name</h3>
                            <p>{password.name}</p>
                        </label>
                        <label>
                            Username
                            <button onClick={() => navigator.clipboard.writeText(password.username)}>
                                {password.username}
                            </button>
                        </label>
                        <label>
                            Password
                            <button className='switchy-button' onClick={() => navigator.clipboard.writeText(password.history[password.history.length - 1].password)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} >
                            {isHovered ? password.history[password.history.length - 1].password : '********'}
                            </button>
                        </label>
                        <div>
                        <button onClick={() => setShowHistory(!showHistory)} disabled={password.history && password.history.length <= 1}>
                                {showHistory ? 'Hide History' : 'Show History'}
                            </button>
                            {showHistory ? <History password={password} handleClose={() => setShowHistory(false)} /> : null}    
                        </div>
                        <label>
                            URL
                            <a href={`http://${password.url}`} target="_blank" rel="noopener noreferrer">
                                <button>{password.url}</button>
                            </a>
                        </label>
                        <label>
                            <h3>Tag</h3>
                            <p>{password.tags}</p>
                        </label>
                        <label>
                            <h3>Comment</h3>
                            <p>{password.comment}</p>
                        </label>
                    </div>
                    </>
                ) : (
                    <p>NOT FOUND</p>
                )}
            </div>
        </div>
    )
};

export default DisplayPassword;