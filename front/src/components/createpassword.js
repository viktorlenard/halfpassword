import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Generator from './generator';

const CreatePassword = () => {
    
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [passwordValue, setPasswordValue] = useState();
    const [url, setUrl] = useState();
    const [tags, setTags] = useState('');
    const [comment, setComment] = useState();

    const handleGenerate = (generatedPassword) => {
        if (generatedPassword !== undefined) {
            setPasswordValue(generatedPassword);
        }
    };

    const handleSave = async () => {
        if (!name || !passwordValue) {
            alert('Name and Password are required fields');
            return;
        }
    
        const response = await fetch(`/api/passwords/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 1,
                name: name,
                username: username,
                url: url,
                tags: tags,
                comment: comment,
                history: [{
                    password: passwordValue,
                }]
            })
        });
    
        if (response.ok) {
            navigate('/'); // Re-fetch the password data, so that the display is updated
        } else {
            console.error('Save failed');
        }
    };

    const handleDiscard = () => {
        navigate('/');
    };
    
    return (
        <div>
            <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDiscard}>Discard</button>
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
                        <option value=''>No tag</option>
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
            <Generator onDataChange={handleGenerate}/>
        </div>
    )
};

export default CreatePassword;