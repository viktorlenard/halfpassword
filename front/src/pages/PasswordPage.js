import React, {useState, useEffect} from 'react';
import EditPassword from '../components/editpassword';
import DisplayPassword from '../components/displaypassword';
import { useParams } from 'react-router-dom';

const PasswordPage = () => {
    
    let { id } = useParams();
    let [password, setPassword] = useState(null);
    let [isEditing, setIsEditing] = useState(false);
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
            {isEditing ? 
                <EditPassword password={password} getPassword={getPassword} setIsEditing={setIsEditing} /> 
                : 
                <DisplayPassword password={password} getPassword={getPassword} setIsEditing={setIsEditing} />
            }
        </div>
    )
};

export default PasswordPage;