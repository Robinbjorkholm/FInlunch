import React, { useState, forwardRef } from "react";
import "../styles/Hero.css";
import DropDownMenu from "./DropDownMenu";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Hero = React.forwardRef(
  (
    {
      logout,
      user,
      isMobile,
      isMobileNavigation,
      mobileFilteringActive,
      setmobileFilteringActive,
    },
    ref
  ) => {
    const [userMenu, setuserMenu] = useState(false);

    return (
      <div className="hero">
        {!isMobileNavigation ? null : (
          <GiHamburgerMenu
            forwardref={ref}
            size={36}
            className="mobile-hamburger-filter-menu"
            onClick={() => setmobileFilteringActive(!mobileFilteringActive)}
          />
        )}

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
);

export default Hero;
