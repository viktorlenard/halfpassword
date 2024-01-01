import React, {useState, useEffect, useContext} from 'react';
import EditPassword from '../components/editpassword';
import DisplayPassword from '../components/displaypassword';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const PasswordPage = () => {
    
    let {authTokens, logoutUser} = useContext(AuthContext);

    const { id } = useParams();
    const [password, setPassword] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const getPassword = async () => {
        let response = await fetch(`/api/passwords/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
          });
        let data = await response.json();
        if (response.status === 200) {
            setPassword(data);
          }else if(response.statusText === 'Unauthorized')
          {
            logoutUser();
          }
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