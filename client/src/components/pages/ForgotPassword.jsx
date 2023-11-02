import React, { useState } from "react";
import Hero from "../Hero";
import sendResetEmail from "../Api/sendResetEmail";

import "../../styles/LoginSignup.css";

function ForgotPassword({ isMobileNavigation }) {
  const [resetEmail, setresetEmail] = useState("");
  const [emailSent, setemailSent] = useState(false);
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="login-header-div">
            <h1 className="form-header">Reset password</h1>
          </div>

          <form
            onSubmit={() => sendResetEmail(resetEmail, setemailSent)}
            className="user-form"
          >
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
            {emailSent ? (
              <p> An reset email thing sent to {resetEmail}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
