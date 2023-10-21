import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registerUser from "../Api/registerUser";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

const AccountSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username has to be between 5 and 20 characters.")
    .min(5)
    .max(20),
  password: yup
    .string()
    .required("Password has to be between 10 and 30 characters.")
    .min(10)
    .max(30),
  confirmPassword: yup
    .string()
    .required("Passwords must match.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
  email: yup.string().email().required("a valid email is required."),
});

function CreateAccount() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [registerError, setregisterError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(AccountSchema),
  });

  function submitRegister(event) {
    event.preventDefault();
    handleSubmit(
      registerUser(Username, Password, Email).then((response) => {
        setregisterError(response);
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
            <h1 className="form-header"> Create Account</h1>
            {registerError && (
              <p className="login-form-error-message">{registerError}</p>
            )}
          </div>
          <form className="user-form" onSubmit={submitRegister}>
            <div className="input-div">
              <input
                {...register("username", { required: "username" })}
                type="text"
                name="username"
                className="create-user-input"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              {errors.username && (
                <p className="form-error-message">{errors.username.message}</p>
              )}
            </div>
            <div className="input-div">
              <input
                {...register("email", { required: "email" })}
                type="email"
                name="email"
                className="create-user-input"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && (
                <p className="form-error-message">{errors.email.message}</p>
              )}
            </div>
            <div className="input-div">
              <input
                {...register("password", { required: "password" })}
                type="password"
                name="password"
                className="create-user-input"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              {errors.password && (
                <p className="form-error-message">{errors.password.message}</p>
              )}
            </div>
            <div className="input-div">
              <input
                {...register("confirmPassword", {
                  required: "confirmPassword",
                })}
                type="password"
                name="confirmPassword"
                className="create-user-input"
                placeholder="Confirm password"
              ></input>
              {errors.confirmPassword && (
                <p className="form-error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="Submit"
              value="Submit"
              disabled={!isDirty || !isValid}
              className="login-create-submit-button"
            >
              Create now{" "}
            </button>

            <p className="create-account-invalid-error-message">
              Please enter required fields.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
