import React, { useState } from "react";
import Hero from "../Hero";
import FoodDisplay from "../FoodDisplay";
import Filtering from "../utility/Filtering";
import Footer from "../Footer";
import { useMediaQuery } from "react-responsive";

function Home({
  logout,
  user,
  userLocationLng,
  userLocationLat,
  userLocation,
}) {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [descending, setDescending] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [mobileFilteringActive, setmobileFilteringActive] = useState(false);
  //toggle Descending sorting
  const handleDescending = () => {
    setAscending(false);
    setDescending(!descending);
  };
  //toggle Ascending sorting
  const handleAscending = () => {
    setDescending(false);
    setAscending(!ascending);
  };
  //check if screen is less than 800px to toggle mobile
  const isMobile = useMediaQuery({
    query: "(min-width: 800px ",
  });
  //check if screen is less than 1101px to toggle mobile filter menu
  const isMobileNavigation = useMediaQuery({
    query: "(min-width: 1101px ",
  });
  const handleToggleMobileMenu = () => {
    console.log("adsfhjiudsiofguhhdsiolufhju");
    setmobileFilteringActive(!mobileFilteringActive);
  };

  const closeMobileMenu = () => {
    setmobileFilteringActive(false);
  };
  return (
    <div>
      <Hero
        logout={logout}
        user={user}
        isMobile={isMobile}
        isMobileNavigation={isMobileNavigation}
        mobileFilteringActive={mobileFilteringActive}
        handleToggleMobileMenu={handleToggleMobileMenu}
      />
      <FoodDisplay
        userLocationLng={userLocationLng}
        userLocationLat={userLocationLat}
        userLocation={userLocation}
        selectedFoodType={selectedFoodType}
        user={user}
        isMobile={isMobile}
        descending={descending}
        ascending={ascending}
      />
      <Filtering
        closeMobileMenu={closeMobileMenu}
        handleDescending={handleDescending}
        descending={descending}
        ascending={ascending}
        handleAscending={handleAscending}
        setSelectedFoodType={setSelectedFoodType}
        user={user}
        isMobileNavigation={isMobileNavigation}
        mobileFilteringActive={mobileFilteringActive}
        handleToggleMobileMenu={handleToggleMobileMenu}
      />
      <Footer />
    </div>
  );
}

export default Home;
