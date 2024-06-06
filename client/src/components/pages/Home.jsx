import React, { useState, useRef, useEffect } from "react";
import Hero from "../Hero";
import FoodDisplay from "../FoodDisplay";
import Filtering from "../utility/Filtering";
import Footer from "../Footer";
import { useMediaQuery } from "react-responsive";
import { HomeContext } from "../../App";

function Home({}) {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [descendingSorting, setdescendingSorting] = useState(false);
  const [ascendingSorting, setascendingSorting] = useState(false);
  const [mobileFilteringActive, setmobileFilteringActive] = useState(false);
  const [foodFormOpen, setfoodFormOpen] = useState(false);

  let navigationRef = useRef();

  //check if user clicks outside filtering menu
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!navigationRef.current.contains(e.target)) {
        setmobileFilteringActive(false);
      }
    });
  }, []);

  //toggle descendingSorting sorting
  const handledescendingSorting = () => {
    setascendingSorting(false);
    setdescendingSorting(!descendingSorting);
  };
  //toggle ascendingSorting sorting
  const handleascendingSorting = () => {
    setdescendingSorting(false);
    setascendingSorting(!ascendingSorting);
  };
  //check if screen is less than 800px to toggle mobile
  const isMobile = useMediaQuery({
    query: "(min-width: 800px ",
  });

  return (
    <div>
      <Hero
        isMobile={isMobile}
        mobileFilteringActive={mobileFilteringActive}
        setmobileFilteringActive={setmobileFilteringActive}
        ref={navigationRef}
        setfoodFormOpen={setfoodFormOpen}
      />
      <FoodDisplay
        selectedFoodType={selectedFoodType}
        isMobile={isMobile}
        descendingSorting={descendingSorting}
        ascendingSorting={ascendingSorting}
        foodFormOpen={foodFormOpen}
        setfoodFormOpen={setfoodFormOpen}
      />
      <Filtering
        handledescendingSorting={handledescendingSorting}
        handleascendingSorting={handleascendingSorting}
        descendingSorting={descendingSorting}
        ascendingSorting={ascendingSorting}
        setSelectedFoodType={setSelectedFoodType}
        mobileFilteringActive={mobileFilteringActive}
        navigationRef={navigationRef}
      />
      <Footer />
    </div>
  );
}

export default Home;
