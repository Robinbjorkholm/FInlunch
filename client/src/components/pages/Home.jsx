import React, { useState, useRef, useEffect } from "react";
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
  isMobileNavigation,
}) {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [descending, setDescending] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [mobileFilteringActive, setmobileFilteringActive] = useState(false);
  const [foodFormOpen, setfoodFormOpen] = useState(false);

  let navigationRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!navigationRef.current.contains(e.target)) {
        setmobileFilteringActive(false);
      }
    });
  }, []);
  //check if user clicks outside filtering menu

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

  return (
    <div>
      <Hero
        logout={logout}
        user={user}
        isMobile={isMobile}
        isMobileNavigation={isMobileNavigation}
        mobileFilteringActive={mobileFilteringActive}
        setmobileFilteringActive={setmobileFilteringActive}
        ref={navigationRef}
        setfoodFormOpen={setfoodFormOpen}
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
        foodFormOpen={foodFormOpen}
        setfoodFormOpen={setfoodFormOpen}
      />
      <Filtering
        handleDescending={handleDescending}
        descending={descending}
        ascending={ascending}
        handleAscending={handleAscending}
        setSelectedFoodType={setSelectedFoodType}
        user={user}
        isMobileNavigation={isMobileNavigation}
        mobileFilteringActive={mobileFilteringActive}
        navigationRef={navigationRef}
      />
      <Footer />
    </div>
  );
}

export default Home;
