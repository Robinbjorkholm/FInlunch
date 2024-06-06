import React, {
  useState,
  forwardRef,
  useRef,
  useEffect,
  useContext,
} from "react";
import { HomeContext } from "../App";
import "../styles/Hero.css";
import DropDownMenu from "./DropDownMenu";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

const Hero = React.forwardRef(
  (
    {
      isMobile,
      mobileFilteringActive,
      setmobileFilteringActive,
      setfoodFormOpen,
    },
    ref
  ) => {
    const { isMobileNavigation, user } = useContext(HomeContext);
    const [userMenu, setuserMenu] = useState(false);
    return (
      <div className="hero">
        {isMobileNavigation &&
          (!mobileFilteringActive ? (
            <GiHamburgerMenu
              size={36}
              className="mobile-hamburger-filter-menu"
              onClick={() => setmobileFilteringActive(true)}
            />
          ) : (
            <MdOutlineClose
              size={36}
              className="mobile-hamburger-filter-menu"
              onClick={() => setmobileFilteringActive(false)}
            />
          ))}

        <a href="/" className="finlunch-banner">
          FinLunch
        </a>
        {!user ? (
          <a className="login" href="/Login">
            Login
          </a>
        ) : (
          <div className="login">
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
                setuserMenu={setuserMenu}
                setfoodFormOpen={setfoodFormOpen}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

export default Hero;
