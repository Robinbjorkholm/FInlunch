import React from "react";
import "../../styles/PopupModal.css";

function PopupModal({ closePopupModal }) {
  return (
    <div className="popup-modal-background">
      <div className="popup-modal">
        <div className="popup-modal-div">
          <h1>Hello</h1>
          <h2>Welcome to Finlunch</h2>
          <br />
          <p className="popup-modal-text">
            This webapp was built for learning fullstack development and may
            have bugs or incomplete features.
          </p>
          <br />
          <p className="popup-modal-text">
            <b>*Cookies*</b>
          </p>
          <p className="popup-modal-text">
            This site uses cookies by clicking{" "}
            <span className="okay">okay</span> you allow the site to store
            cookies in your browser
          </p>
          <br />
        </div>
        <button
          className="popup-modal-close-button"
          onClick={() => closePopupModal()}
        >
          okay
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
