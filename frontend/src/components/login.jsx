import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientID = "632119173451-99qld8ukl9ori1rvjd1gt5qju31gempa.apps.googleusercontent.com"
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
                    navigate('/home', { state: { tokenAuth: response.data.tokenAuth, username: response.data.username } })
                }
            });
    }
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/registration`;
        navigate(path);
    }
    // Login GOOGLE

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    })
    const responseGoogle = (response) => {
        const param = {
            mail: response.profileObj.email,
            username: response.profileObj.givenName,
            tokenAuth: response.accessToken,
        }
        axios
            .post("http://localhost:8082/users/login/google", param)
            .then((response) => {
                console.log(response.data)
                setError("")
                setMessage("")
                if (response.data.status !== 200)
                    setError("Invalid information !")
                else {
                    setMessage(response.data.message)
                    navigate('/home', { state: { tokenAuth: response.data.tokenAuth, username: response.data.username } })

                }
            });
    };
    const handleFailure = (response) => {
        setError("Error, try again !")
    };
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
                    <div className="LoginButtons">
                        <GoogleLogin
                            className="ButtonGoogle"
                            clientId={clientID}
                            //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
                            onSuccess={responseGoogle}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                         <div className="button-container Signin">
                            <button onClick={handleSubmit}>Signin</button>
                        </div>
                    </div>
                </div>
                <div className="Registration button-container">
                    <div className="buttons-container">
                        <button onClick={routeChange}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
