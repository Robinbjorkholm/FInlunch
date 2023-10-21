import React, { useState } from "react";
import "../styles/Hero.css";
import DropDownMenu from "./DropDownMenu";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import finlunchbanner from "../images/finlunchbanner.png";

export default function Hero({
  logout,
  user,
  isMobile,
  handleToggleMobileMenu,
  isMobileNavigation,
}) {
  const [userMenu, setuserMenu] = useState(false);

  return (
    <div className="hero">
      {!isMobileNavigation ? (
        <GiHamburgerMenu
          size={24}
          className="mobile-hamburger-filter-menu"
          onClick={() => handleToggleMobileMenu()}
        />
      ) : null}

      <a href="/" className="finlunch-banner">
        FinLunch
      </a>
      {!user ? (
        <a className="login" href="/Login">
          Login
        </a>
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
