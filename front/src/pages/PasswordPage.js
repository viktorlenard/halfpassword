import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const PasswordPage = () => {
    
    let { id } = useParams();
    let [password, setPassword] = useState(null);
    let getPassword = async () => {
        let response = await fetch(`/api/passwords/${id}`);
        let data = await response.json();
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
                        <p>{password.name}</p>
                        <p>{password.username}</p>
                        <p>{password.ciphertext}</p>
                        <p>{password.url}</p>
                        <p>{password.tags}</p>
                        <p>{password.comment}</p>
                    </>
                ) : (
                    <p>NOT FOUND</p>
                )}
            </div>
        </div>
    )
};

export default PasswordPage;