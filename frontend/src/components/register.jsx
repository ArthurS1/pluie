import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

const Register = () => {
    const [email, setemail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        const param = {
            username: username,
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
        let path = `/`;
        navigate(path);
    }
    return (
        <div className="Application">
            <div className="form-inner">
                <div className="form">
                    <h2>Register</h2>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" value={email} onChange={event => setemail(event.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
                    </div>
                    <div className="button-container">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="Registration">
                    <div className="buttons-container">
                        <button onClick={routeChange}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
