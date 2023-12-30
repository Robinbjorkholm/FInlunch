import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import spinningburger from "../../images/spinningburger.png";
import "../../styles/SpinningBurger.css";

function SpinningBurger() {
  //this function renders a spinning hamburger if the backend doesnt respond
  return (
    <div id="spinning-burger-div">
      <div>
        <img
          src={spinningburger}
          id="spinning-burger"
          alt="a delicious hamburger that is spinning clockwise "
        />
        <br /> <br />
        <div id="waiting-for-server-div">
          <p>
            <span>Waiting for server to deliver my food </span>
            <span>
              <PulseLoader color="#000000" size={2} speedMultiplier={0.4} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpinningBurger;
