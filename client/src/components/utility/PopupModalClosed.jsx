import React from "react";
import "../../styles/PopupModal.css";

function PopupModalClosed({ closePopupClosed }) {
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
        <button
          className="popup-modal-close-button"
          onClick={() => closePopupClosed()}
        >
          okay
        </button>
        <br />
      </div>
    </div>
  );
}

export default PopupModalClosed;
