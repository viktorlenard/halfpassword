import React, { useState } from 'react';
import Generator from './generator';

const EditPassword = ({ password, getPassword, setIsEditing }) => {
    
    const [passwordValue, setPasswordValue] = useState(password.ciphertext);
    
    const handleGenerate = (generatedPassword) => {
        if (generatedPassword !== undefined) {
            setPasswordValue(generatedPassword);
        }
    };

    return (
        <div>
            {/* Render 'NOT FOUND' if nothing comes back from the call */}
            <div className='entry-card'>
                {password ? (
                    <>
                    <div>
                        <button onClick={() => setIsEditing(false)}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Discard</button>
                    </div>
                    <div className='password-card'>
                        <label>
                            Name
                            <textarea defaultValue={password.name}></textarea>
                        </label>
                        <label>
                            Username
                            <textarea defaultValue={password.username}></textarea>
                        </label>
                        <label>
                            Password
                            <textarea value={passwordValue} onChange={e => setPasswordValue(e.target.value)}></textarea>
                        </label>
                        <label>
                            URL
                            <textarea defaultValue={password.url}></textarea>
                        </label>
                        <label>
                            Tag
                            <select defaultValue={password.tags} multiple={false} name="tags" >
                                <option value={'blue'}>Blue</option>
                                <option value={'red'}>Red</option>
                                <option value={'green'}>Green</option>
                                <option value={'yellow'}>Yellow</option>
                                <option value={'purple'}>Purple</option>
                            </select>
                        </label>
                        <label>
                            Comment
                            <textarea defaultValue={password.comment}></textarea>
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