import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faEyeSlash,
  faEye,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
function Login({
  login,
  email,
  setEmail,
  password,
  setPassword,
  reset,
  loginError,
  user,
}) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  function showHide() {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  }

  return (
    <form className="mt-1" onSubmit={handleLogin}>
      <br />
      {loginError && <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>}
      <label> Email: </label>
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <div>
        <label> Password: </label>
        <br />
        <input
          className="mt-1"
          type={type}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          onClick={showHide}
          style={{ marginLeft: "-35px" }}
          icon={icon}
        />
      </div>
      <br />
      <button className="mt-1" type="submit">
        {" "}
        <FontAwesomeIcon icon={faArrowRightToBracket} /> Log in
      </button>{" "}
      <button className="mt-1" onClick={reset}>
        <FontAwesomeIcon icon={faArrowsRotate} />
        Reset
      </button>
      {user && <Navigate to="/" />}
    </form>
  );
}

export default Login;
