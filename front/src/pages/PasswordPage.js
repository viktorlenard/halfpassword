import React, {useState, useEffect} from 'react';
import EditPassword from '../components/editpassword';
import DisplayPassword from '../components/displaypassword';
import { useParams } from 'react-router-dom';

const PasswordPage = () => {
    
    const { id } = useParams();
    const [password, setPassword] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const getPassword = async () => {
        let response = await fetch(`/api/passwords/${id}`);
        let data = await response.json();
        setPassword(data);
    }

    useEffect (() => {
        getPassword();
    }, [id]);

    return (
        <div>
            {isEditing ? 
                <EditPassword password={password} getPassword={getPassword} setIsEditing={setIsEditing} /> 
                : 
                <DisplayPassword password={password} getPassword={getPassword} setIsEditing={setIsEditing} />
            }
        </div>
    )
};

export default PasswordPage;