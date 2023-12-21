import React, {useState, useEffect} from 'react';
import EditPassword from '../components/editpassword';
import DisplayPassword from '../components/displaypassword';
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
            <DisplayPassword password={password} getPassword={getPassword} />
            <EditPassword password={password} getPassword={getPassword} />
        </div>
    )
};

export default PasswordPage;