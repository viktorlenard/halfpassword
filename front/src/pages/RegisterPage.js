import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }else if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }else {
            const response = await fetch(`/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                })
            });
        
            if (response.ok) {
                navigate('/'); // Re-fetch the password data, so that the display is updated
            } else {
                console.error('Save failed');
            }
        }
    };
    
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input onChange={e => setUsername(e.target.value)} type="text" name="username=field" placeholder="Username"/>
                </label>
                <label>
                    Email:
                    <input onChange={e => setEmail(e.target.value)} type="email" name="email-field" placeholder="Email"/>
                </label>
                <label>
                    Password:
                    <input onChange={e => setPassword(e.target.value)} type="password" name="password-field" />
                </label>
                <label>
                    Confirm Password:
                    <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm-password-field" />
                </label>
                <input onClick={handleRegister} type="submit" value="Login" />
            </form>
        </div>
    );
}

export default RegisterPage;