import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-div">
      <h3 className="footer-h3">Got a food suggestion or collaboration? </h3>

      <h3>
        contact me @ -{" "}
        <a href="mailto:mclobsterceo@gmail.com">
          <u> mcLobsterCEO</u>
        </a>
      </h3>
    </div>
  );
}

export default Footer;
