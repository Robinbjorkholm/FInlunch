import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Hero from "../Hero";
import * as yup from "yup";
import loginUser from "../Api/loginUser";
import FoodDisplay from "../FoodDisplay";

import "../../styles/LoginSignup.css";

const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(30),
  password: yup.string().min(10).max(30),
});

function Login() {
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  function submitLogin(event) {
    event.preventDefault();
    handleSubmit(
      loginUser(LoginUsername, LoginPassword).then((response) => {
        setLoginError(response.response.data);
      })
    );
  }

  return (
    <div>
      <div className="hero">
        <a href="/" className="finlunch-banner">
          FinLunch
        </a>
      </div>

      <div className="user-page">
        <div className="user-div">
          <div className="login-header-div">
            <h1 className="form-header"> Login</h1>
          </div>
          <form onSubmit={submitLogin} className="user-form">
            <div className="input-div">
              <input
                type="text"
                name="username"
                className="create-user-input"
                placeholder="Username"
                onChange={(e) => {
                  setLoginUsername(e.target.value);
                }}
              >
                {errors.username && (
                  <p className="form-error-message">
                    {errors.username.message}
                  </p>
                )}
              </input>
            </div>
            <div className="input-div">
              <input
                type="password"
                name="password"
                className="create-user-input"
                placeholder="Password"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              ></input>
              {errors.password && (
                <p className="form-error-message">{errors.password.message}</p>
              )}
            </div>
            <button
              type="Submit"
              value="Submit"
              className="login-create-submit-button"
            >
              {" "}
              Login{" "}
            </button>
            {LoginError && (
              <p className="login-form-error-message">{LoginError}</p>
            )}
            <div id="signup-div">
              <p>Need an account? &nbsp;</p>
              <a href="/CreateAccount" id="signup-href">
                Create now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
