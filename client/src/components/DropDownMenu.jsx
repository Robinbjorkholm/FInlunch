import React, { useEffect, useRef } from "react";
import "./../styles/DropDownMenu.css";
import { BiLogOut, BiListPlus } from "react-icons/bi";
import { motion } from "framer-motion";

export default function DropDownMenu({
  logout,
  user,
  setuserMenu,
  setfoodFormOpen,
}) {
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, []);

  let menu = useRef();

  const closeMenu = (e) => {
    if (!menu.current.contains(e.target)) {
      setuserMenu(false);
    }
  };
  return (
    <motion.div ref={menu} className="drop-down-menu" animate={{ y: 10 }}>
      <p id="drop-down-menu-username">{user.username}</p>
      <hr />
      <button className="drop-down-menu-button" onClick={() => logout()}>
        <BiLogOut className="drop-down-menu-icon" size={24} />
        <p id="drop-down-menu-text">&nbsp;Logout</p>
      </button>
      {user.admin && (
        <button
          className="drop-down-menu-button"
          onClick={() => setfoodFormOpen(true)}
        >
          <BiListPlus className="drop-down-menu-icon" size={24} />
          <p id="drop-down-menu-text">&nbsp;New food</p>
        </button>
      )}
    </motion.div>
  );
}
