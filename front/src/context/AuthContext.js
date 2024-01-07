import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

// AuthContext.Provider is used to provide the context value to its children
// AuthContext.Consumer is used to consume the context value in a component

export const AuthProvider = ({ children }) => {
   
    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (e) => {
        const username = e.target.elements['username'].value;
        const password = e.target.elements['password'].value;
        e.preventDefault();
        
        const response = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        const data = await response.json();
        
        if(response.status === 200){
            console.log(data.refresh);
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }else{
            console.log(data);
        }
    }

    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login/');
    }, [navigate]);

    const updateToken = useCallback(async () => {
        let response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            console.log('Yous a bitch!')
            logoutUser();
        }
    
        if (loading) {
            setLoading(false);
        }
    }, [authTokens, loading, logoutUser]);

    useEffect(() => {
        
        if (loading) {
            updateToken()
        }
        
        const fourMinutes = 4 * 60 * 1000;
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes)
        return () => {
            clearInterval(interval);
        }
    }, [authTokens, loading, updateToken]);

    const contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    
    return (
        <AuthContext.Provider value={contextData}>
            {loading? null :children}
        </AuthContext.Provider>
    );
};