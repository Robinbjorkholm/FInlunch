import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

function PasswordUpdated({ isMobileNavigation }) {
  const navigate = useNavigate();
  const [redirectIn, setredirectIn] = useState(5);

  useEffect(() => {
    setInterval(() => {
      setredirectIn(redirectIn - 1);
    }, 1000);
    if (redirectIn === 0) {
      navigate("/Login");
    }
  }, [redirectIn]);
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <FcCheckmark size={100} />
            <h1>Password Changed</h1>
            <br />
            <p>Your password has been changed successfully!</p>
            <p>you will be redirected to the login page in {redirectIn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdated;
