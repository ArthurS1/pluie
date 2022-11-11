import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    const param = {
      username: username,
      mail: email,
      password: password,
    };
    axios
      .post("http://pluie-back.azurewebsites.net/users/signup", param)
      .then((response) => {
        setError("");
        setMessage("");
        if (response.data.status !== 200) setError(response.data.message);
        else setMessage("Account created !");
      });
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <div className="Application">
      <div className="form-inner">
        <div className="form">
          <h2>Register</h2>
          {error !== "" ? <div className="error">{error}</div> : ""}
          {message !== "" ? <div className="message">{message}</div> : ""}
          <div className="input-container">
            <label>Email </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(event) => setemail(event.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button onClick={handleSubmit}>Register</button>
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
