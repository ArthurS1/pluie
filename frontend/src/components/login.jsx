import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async () => {
        const param = {
            mail: email,
            password: password 
        }
        axios
            .post("http://localhost:8082/users/login", param)
            .then((response) => {
                console.log(response.data)
                setError("")
                setMessage("")
                if (response.data.status !== 200)
                    setError("Invalid information !")
                else {
                    setMessage(response.data.message)
                    navigate('/home')
                }
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
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}
                    {(message !== "") ? (<div className="message">{message}</div>) : ""}
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
