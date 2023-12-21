import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const PasswordPage = () => {
    
    let { id } = useParams();
    let [password, setPassword] = useState(null);
    let getPassword = async () => {
        let response = await fetch(`/api/passwords/${id}`);
        let data = await response.json();
        console.log(data);
        setPassword(data);
    }

    useEffect (() => {
        getPassword();
    }, [id]);

    return (
        <div>
            <p>Entry with id:{id}</p>
            {/* Render 'NOT FOUND' if nothing comes back from the call */}
            <div className='entry-card'>
                {password ? (
                    <>
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
                            <textarea defaultValue={password.ciphertext}></textarea>
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
        </div>
    )
};

export default PasswordPage;