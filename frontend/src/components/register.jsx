import * as React from "react";

const Register = () => {
  return (
    <form>
        <div className="form-inner">
            <h2>Register</h2>
            <div className="input-container">
                <label>Create a Username </label>
                <input type="text" name="username" required />
            </div>
            <div className="input-container">
                <label>Create a Password </label>
                <input type="password" name="password" required />
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
        </div>
    </form>
  );
};

export default Register;
