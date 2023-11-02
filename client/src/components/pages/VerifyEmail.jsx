import React from "react";
import { useParams } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import Cookies from "js-cookie";
import verifyEmail from "./../Api/verifyEmail";
import Hero from "../Hero";

function VerifyEmail({ isMobileNavigation }) {
  // get id and token from link
  const { id, token } = useParams();
  //call api with id and token
  verifyEmail(id, token);
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <FcApproval size={100} />
            <h1 className="confirm-email-header">
              Hi, {Cookies.get("username")}
            </h1>
            <p className="user-text-p">
              Thank you for verifying.
              <br></br> You can now use your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
