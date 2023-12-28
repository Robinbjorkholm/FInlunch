import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginUser from "../Api/loginUser";
import ClipLoader from "react-spinners/ClipLoader";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(30),
  password: yup.string().min(10).max(30),
});

function Login({ isMobileNavigation }) {
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginError, setLoginError] = useState();
  const [loading, setloading] = useState(false);

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
      setloading(true),
      loginUser(LoginUsername, LoginPassword, setloading).then((response) => {
        setLoginError(response);
      })
    );
  }

  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />

      <div className="user-page">
        <div className="user-div">
          <div className="login-header-div">
            <h1 className="form-header"> Login</h1>
            {LoginError && (
              <p className="login-form-error-message">{LoginError}</p>
            )}
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
            <div className="signup-div">
              <p>Need an account? &nbsp;</p>
              <a href="/CreateAccount" className="signup-href">
                Create now
              </a>
            </div>{" "}
            <div className="signup-div">
              <a href="/SendForgotPasswordEmail" className="signup-href">
                Forgot password ?
              </a>
            </div>
          </form>
          {loading && <ClipLoader color="#FCB54D" className="loader" />}
        </div>
      </div>
    </div>
  );
}

export default Login;
