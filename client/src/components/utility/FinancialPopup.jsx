import React, { useState } from "react";
import useCookieToggle from "../hooks/useCookiesToggle";
import "../../styles/PopupModal.css";

function FinancialPopup({setfinancialModalToggle}) {
  const [cookie, setCookie] = useState(false);

  const toggleCookie = useCookieToggle("FinancialPopupCookie", setCookie,setfinancialModalToggle);

  return (
    <div className="popup-modal-background">
      <div className="popup-modal">
        <div className="popup-modal-div">
          <br />
          <p className="popup-modal-text">
            This site isn't running anymore because of financial reasons 😥
          </p>
        </div>{" "}
        <br />
        <button className="popup-modal-close-button" onClick={toggleCookie}>
          okay
        </button>
        <br />
      </div>
    </div>
  );
}

export default FinancialPopup;
