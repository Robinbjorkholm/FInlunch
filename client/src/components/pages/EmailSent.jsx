import React, { useState } from "react";
import Hero from "../Hero";
import Cookies from "js-cookie";

import "../../styles/LoginSignup.css";
import "../../styles/ConfirmEmail.css";

function EmailSent({ isMobileNavigation }) {
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <h1 className="confirm-email-header">Email sent!</h1>
            <div className="confirm-email-message">
              <p className="user-text-p">
                An email containing a password reset link has been sent to
                <br />
                <b>{Cookies.get("email")} </b>
                <br /> Please read the email and follow the instructions to
                reset your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
