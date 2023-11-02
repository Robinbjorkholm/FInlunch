import React from "react";
import { FcCheckmark } from "react-icons/fc";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

function passwordUpdated({ isMobileNavigation }) {
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <FcCheckmark size={100} />
            <h1 className="confirm-email-header">Password Changed</h1>
            <p>Your password has been changed successfully!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default passwordUpdated;
