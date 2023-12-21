import React, { useState } from 'react';

const DisplayPassword = ({ password, getPassword }) => {
    
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            {/* Render 'NOT FOUND' if nothing comes back from the call */}
            <div className='entry-card'>
                {password ? (
                    <>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
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
                            <button className='switchy-button' onClick={() => navigator.clipboard.writeText(password.ciphertext)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} >
                            {isHovered ? password.ciphertext : '********'}
                            </button>
                        </label>
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