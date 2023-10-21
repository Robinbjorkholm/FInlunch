import React, { useState } from "react";
import Hero from "../Hero";
import Cookies from "js-cookie";
import "../../styles/LoginSignup.css";
import "../../styles/ConfirmEmail.css";

function ConfirmEmail() {
  return (
    <div>
      <Hero />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <h1 className="confirm-email-header">Thanks for registering!</h1>
            <p className="confirm-email-message">
              An email has been sent to {Cookies.get("email")} containing an
              activation link. Please click on the link to activate your
              account. If you do not receive the email within a few minutes,
              please check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
