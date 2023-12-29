import React from "react";

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username=field" placeholder="Username"/>
                </label>
                <label>
                    Email:
                    <input type="text" name="email-field" placeholder="Email"/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password-field" />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirm-password-field" />
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default RegisterPage;