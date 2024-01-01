import React, { useContext }from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    
    let {loginUser} = useContext(AuthContext);
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <label>
                    Username:
                    <input type="text" name="username" placeholder="Username"/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" placeholder="Password"/>
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default LoginPage;