import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// AuthContext.Provider is used to provide the context value to its children
// AuthContext.Consumer is used to consume the context value in a component

export default AuthContext;

export const AuthProvider = ({ children }) => {
   
    const navigate = useNavigate();

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);

    let loginUser = async (e) => {
        let username = e.target.elements['username'].value;
        let password = e.target.elements['password'].value;
        e.preventDefault();
        let response = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value})
        })
        let data = await response.json();
        
        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }else{
            console.log(data);
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    let updateToken = async () => {
        let response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }

    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(() => {
        
        if (loading) {
            updateToken()
        }
        
        const fourMinutes = 4 * 60 * 1000;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes)
        return () => {
            clearInterval(interval);
        }
    }, [authTokens, loading]);
    
    return (
        <AuthContext.Provider value={contextData}>
            {loading? null :children}
        </AuthContext.Provider>
    );
};