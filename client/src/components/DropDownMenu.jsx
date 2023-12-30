import React, { useEffect, useRef, useState } from "react";
import createNewFoodType from "./Api/createNewFoodType";
import { BiLogOut, BiListPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import "./../styles/DropDownMenu.css";

export default function DropDownMenu({
  logout,
  user,
  setuserMenu,
  setfoodFormOpen,
}) {
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, []);

  const [newFoodType, setnewFoodType] = useState("");
  let menu = useRef();

  console.log(newFoodType);
  //closes dropdownmenu if user clicks outside (incomplete)
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
      {user.admin && (
        <form
          onSubmit={() => createNewFoodType(newFoodType)}
          className="drop-down-menu-form"
        >
          <BiListPlus className="drop-down-menu-icon" size={24} />
          <input
            placeholder="New food type"
            onChange={(e) => {
              setnewFoodType(e.target.value);
            }}
          
          />
          <button
            className="drop-down-menu-button"
            type="Submit"
            value="Submit"
          >
            Add
          </button>
        </form>
      )}
    </motion.div>
  );
}
