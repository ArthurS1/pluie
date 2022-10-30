import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        const param = {
            email: email,
            password: password 
        }
        axios
            .post("http://localhost:8082/signup", param)
            .then((response) => {
                console.log(response)
            });
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/registration`;
        navigate(path);
    }
    return (
        <div className="Application">
            <div className="form-inner">
                <div className="form">
                    <h2>Login</h2>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" value={email} onChange={event => setemail(event.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
                    </div>
                    <div className="buttons-container">
                        <div className="button-container">
                        <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className="Registration">
                    <div className="buttons-container">
                        <button onClick={routeChange}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
