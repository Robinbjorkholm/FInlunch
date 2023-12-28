import React, { useState } from "react";
import Hero from "../Hero";
import Cookies from "js-cookie";
import "../../styles/LoginSignup.css";
import "../../styles/ConfirmEmail.css";

function ConfirmEmail({ isMobileNavigation }) {
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <h1 className="confirm-email-header">Thank you for registering!</h1>
            <div className="confirm-email-message">
              <p className="user-text-p">
                A verification link has been sent to
                <br />
                <b>{Cookies.get("email")} </b>
                <br /> Please click on the link to activate your account. If you
                do not receive the email within a few minutes, please check your
                spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
