import React, { useEffect } from "react";
import Hero from "../Hero";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import verifyEmail from "./../Api/verifyEmail";
import "../../styles/LoginSignup.css";
import { FcCheckmark } from "react-icons/fc";

function VerifyEmail() {
  const { id, token } = useParams();
  verifyEmail(id, token);
  return (
    <div>
      <Hero />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <h1 className="confirm-email-header">
              Hi, {Cookies.get("username")}
            </h1>
            <p>
              Thank you for verifying.
              <br></br> You can now use your account.
            </p>
            <FcCheckmark size={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
