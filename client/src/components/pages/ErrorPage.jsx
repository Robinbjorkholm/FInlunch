import React from "react";
import { FcCancel } from "react-icons/fc";
import Hero from "../Hero";

function ErrorPage({ isMobileNavigation }) {
  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />
      <div className="user-page">
        <div className="user-div">
          <div className="confirm-email-div">
            <FcCancel size={100} />
            <h1 className="confirm-email-header">Ooops</h1>
            <p className="">The page you were looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
