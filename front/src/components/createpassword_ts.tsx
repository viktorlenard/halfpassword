import React, { useState, useContext, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Generator from './generator';
import AuthContext from '../context/AuthContext';

interface AuthTokens {
  access: string;
}

interface User {
  user_id: string;
}

interface AuthContextType {
  authTokens: AuthTokens;
  user: User;
}

const CreatePassword = React.memo(() => {
    const { authTokens, user } = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState<string | undefined>();
    const [username, setUsername] = useState<string | undefined>();
    const [passwordValue, setPasswordValue] = useState<string | undefined>();
    const [url, setUrl] = useState<string | undefined>();
    const [tags, setTags] = useState<string>('');
    const [comment, setComment] = useState<string | undefined>();

    const handleGenerate = (generatedPassword: string | undefined) => {
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                user: user.user_id,
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
                    <textarea value={name || ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setName(e.target.value)}></textarea>
                </label>
                <label>
                    Username
                    <textarea value={username || ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUsername(e.target.value)}></textarea>
                </label>
                <label>
                    Password
                    <textarea value={passwordValue || ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPasswordValue(e.target.value)}></textarea>
                </label>
                <label>
                    URL
                    <textarea value={url || ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUrl(e.target.value)}></textarea>
                </label>
                <label>
                    Tag
                    <select value={tags} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTags(e.target.value)} multiple={false} name="tags" >
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
                    <textarea value={comment || ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}></textarea>
                </label>
            </div>
            <Generator onDataChange={handleGenerate}/>
        </div>
    )
});

export default CreatePassword;