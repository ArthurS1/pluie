import * as React from "react";

const Login = () => {
  return (
    <form>
        <div className="form-inner">
            <h2>Login</h2>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="username"/>
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" />
            </div>
            <div className="buttons-container">
                <div className="button-container">
                    <input type="submit" />
                </div>
            </div>
        </div>
    </form>
  );
};

export default Login;
