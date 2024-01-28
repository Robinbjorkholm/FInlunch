import React, { useState, useEffect } from "react";
import spinningburger from "../../images/spinningburger.png";
import "../../styles/SpinningBurger.css";

function SpinningBurger() {
  //this function renders a spinning hamburger with a countdown timer if the backend doesnt respond or backend is in a "sleeping state"

  const [timer, settimer] = useState(2);

  useEffect(() => {
    if (!timer) return;

    const intervalId = setInterval(() => {
      settimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);
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
          {timer ? (
            <p>
              Waiting for server to deliver my food this should take
              approximately&nbsp;<b>{timer}</b> second(s)
            </p>
          ) : (
            <p>Food should have arrived by now maybe something went wrong...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpinningBurger;
