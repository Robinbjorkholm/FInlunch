import React from "react";
import "../../styles/PopupModal.css";

function PopupModal({ closePopupModal }) {
  return (
    <div className="popup-modal-background">
      <div className="popup-modal">
        <div id="popup-modal-div">
          <h1>Hello</h1>
          <h2>Welcome to Finlunch</h2>
          <br />
          <p id="popup-modal-text">
            This webapp was built for learning fullstack development and may
            have bugs or incomplete features.
          </p>
        </div>
        <button id="popup-modal-close-button" onClick={() => closePopupModal()}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
