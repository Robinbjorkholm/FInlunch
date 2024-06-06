import React, { useEffect, useRef, useState, useContext } from "react";
import { HomeContext } from "../App";
import createNewFoodType from "./Api/createNewFoodType";
import { BiLogOut, BiListPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import "./../styles/DropDownMenu.css";

export default function DropDownMenu({ setuserMenu, setfoodFormOpen }) {
  const {  user, logout } = useContext(HomeContext);
  const [newFoodType, setnewFoodType] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, []);

  let menu = useRef();
  
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
