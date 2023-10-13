import React, { useEffect, useRef } from "react";
import "./../styles/DropDownMenu.css";
import { BiLogOut } from "react-icons/bi";

import { motion } from "framer-motion";

export default function DropDownMenu({ logout, user, setuserMenu }) {
  let menu = useRef();
  useEffect(() => {
    let closeMenu = (e) => {
      if (menu.current.contains(e.target)) {
        return;
      }
      setuserMenu(false);
    };

    document.addEventListener("mousedown", closeMenu);
  });
  return (
    <motion.div ref={menu} className="drop-down-menu" animate={{ y: 50 }}>
      <p id="drop-down-menu-username">{user.username}</p>
      <hr />
      <button id="drop-down-menu-logout" onClick={() => logout()}>
        <BiLogOut className="drop-down-menu-logout-icon" size={24} />
        <p id="drop-down-menu-logout-text">&nbsp;Logout</p>
      </button>
    </motion.div>
  );
}
