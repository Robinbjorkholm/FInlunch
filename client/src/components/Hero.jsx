import React, { useState } from "react";
import "../styles/Hero.css";
import DropDownMenu from "./DropDownMenu";
import { FaUserAlt } from "react-icons/fa";
import finlunchbanner from "../images/finlunchbanner.png";

export default function Hero({ logout, user, isMobile }) {
  const [userMenu, setuserMenu] = useState(false);

  return (
    <div className="hero">
        <a href="/" className="finlunch-banner">
          FinLunch
        </a>

      {!user ? (
        <span className="login">
          <a href="/Login">Login</a>
        </span>
      ) : (
        <span className="login">
          {!isMobile ? (
            <button
              className="login"
              onClick={() => {
                setuserMenu(!userMenu);
              }}
            >
              <FaUserAlt />
            </button>
          ) : (
            <button
              className="login"
              onClick={() => {
                setuserMenu(!userMenu);
              }}
            >
              {user.username}
            </button>
          )}
          {userMenu ? (
            <DropDownMenu
              logout={logout}
              user={user}
              setuserMenu={setuserMenu}
            />
          ) : null}
        </span>
      )}
    </div>
  );
}
