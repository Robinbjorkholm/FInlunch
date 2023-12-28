import React, { useState } from "react";
import sendResetEmail from "../Api/sendResetEmail";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

function ForgotPassword({ isMobileNavigation }) {
  const [resetEmail, setresetEmail] = useState("");
  const [emailSent, setemailSent] = useState(false);
  const [LoginError, setLoginError] = useState();
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  function sendEmail(event) {
    event.preventDefault();
    handleSubmit(
      setloading(true),
      sendResetEmail(resetEmail,setloading).then((response) => {
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
            <h1 className="form-header">Reset password</h1>
          </div>

          <form onSubmit={sendEmail} className="user-form">
            <div className="input-div">
              <input
                type="text"
                name="resetEmail"
                className="create-user-input"
                placeholder="Your email address"
                onChange={(e) => {
                  setresetEmail(e.target.value);
                }}
              ></input>
            </div>
            <button
              className="login-create-submit-button"
              type="Submit"
              value="Submit"
              disabled={resetEmail < 1}
            >
              Send
            </button>
            {LoginError && (
              <p className="login-form-error-message"> {LoginError}</p>
            )}
          </form>
          {loading && <ClipLoader color="#FCB54D" className="loader" />}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
