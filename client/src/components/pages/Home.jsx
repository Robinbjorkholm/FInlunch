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
  return (
    <div>
      <Hero logout={logout} user={user} isMobile={isMobile} />
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
        handleDescending={handleDescending}
        descending={descending}
        ascending={ascending}
        handleAscending={handleAscending}
        setSelectedFoodType={setSelectedFoodType}
        user={user}
        isMobileNavigation={isMobileNavigation}
      />
      <Footer />
    </div>
  );
}

export default Home;
