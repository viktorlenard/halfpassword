import React, { useState } from 'react';
import Generator from './generator';

const EditPassword = ({ password, getPassword, setIsEditing }) => {
    
    const [name, setName] = useState(password.name);
    const [username, setUsername] = useState(password.username);
    const [passwordValue, setPasswordValue] = useState(password.ciphertext);
    const [url, setUrl] = useState(password.url);
    const [tags, setTags] = useState(password.tags);
    const [comment, setComment] = useState(password.comment);
    
    const handleGenerate = (generatedPassword) => {
        if (generatedPassword !== undefined) {
            setPasswordValue(generatedPassword);
        }
    };

    const handleSave = async () => {
        if (password) {
            const response = await fetch(`/api/passwords/${password.id}/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: password.user,
                    name: name,
                    username: username,
                    ciphertext: passwordValue,
                    url: url,
                    tags: tags,
                    comment: comment
                })
            });
    
            if (response.ok) {
                setIsEditing(false);
                getPassword(); // Re-fetch the password data, so that the display is updated
            } else {
                console.error('Update failed');
            }
        }
    };

    return (
        <div>
            {/* Render 'NOT FOUND' if nothing comes back from the call */}
            <div className='entry-card'>
                {password ? (
                    <>
                    <div>
                        <button onClick={() => {handleSave(); setIsEditing(false);}}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Discard</button>
                    </div>
                    <div className='password-card'>
                        <label>
                            Name
                            <textarea value={name} onChange={e => setName(e.target.value)}></textarea>
                        </label>
                        <label>
                            Username
                            <textarea value={username} onChange={e => setUsername(e.target.value)}></textarea>
                        </label>
                        <label>
                            Password
                            <textarea value={passwordValue} onChange={e => setPasswordValue(e.target.value)}></textarea>
                        </label>
                        <label>
                            URL
                            <textarea value={url} onChange={e => setUrl(e.target.value)}></textarea>
                        </label>
                        <label>
                            Tag
                            <select value={tags} onChange={e => setTags(e.target.value)} multiple={false} name="tags" >
                                <option value=''>Select a tag</option>
                                <option value={'blue'}>Blue</option>
                                <option value={'red'}>Red</option>
                                <option value={'green'}>Green</option>
                                <option value={'yellow'}>Yellow</option>
                                <option value={'purple'}>Purple</option>
                            </select>
                        </label>
                        <label>
                            Comment
                            <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
                        </label>
                    </div>
                    </>
                ) : (
                    <p>NOT FOUND</p>
                )}
            </div>
            <Generator onDataChange={handleGenerate}/>
        </div>
    )
};

export default EditPassword;