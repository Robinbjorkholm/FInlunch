import React, { useState, useEffect, useContext } from "react";
import { HomeContext } from "../../App";
import getFoodTypes from "../Api/getFoodTypes";
import deleteFoodType from "../Api/deleteFoodType";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import "../../styles/Filtering.css";

const Filtering = ({
  setSelectedFoodType,
  handleDescendingSorting,
  handleAscendingSorting,
  mobileFilteringActive,
  ascendingSorting,
  descendingSorting,
  navigationRef,
  setmobileFilteringActive,
}) => {
  const { isMobileNavigation, user } = useContext(HomeContext);
  const [foodTypes, setFoodTypes] = useState([]);
  const [clickedFoodType, setClickedFoodType] = useState("");
  const [foodTypeActive, setFoodTypeActive] = useState(null);
  const [newFoodType, setNewFoodType] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [Sorting, setSorting] = useState(null);

  useEffect(() => {
    async function fetchFoodTypes() {
      const foodTypes = await getFoodTypes();
      setFoodTypes(foodTypes);
    }
    fetchFoodTypes();
  }, []);

  const handleFoodFiltering = (food) => {
    if (clickedFoodType === food.foodType) {
      setClickedFoodType("");
      setSelectedFoodType("");
    } else setSelectedFoodType(food.foodType);
    setClickedFoodType(food.foodType);
  };

  const handleDeleteFoodType = async (foodType) => {
    const oldFoodTypes = foodTypes;
    const newFoodTypes = oldFoodTypes.filter(
      (deleteFoodType) => deleteFoodType !== foodType
    );
    setFoodTypes(newFoodTypes);
    deleteFoodType(foodType.id);
  };

  return (
    <React.Fragment>
      <div
        className={!mobileFilteringActive ? "filtering" : "filtering-mobile"}
        ref={navigationRef}
      >
        <ul
          className={
            mobileFilteringActive ? "filter-food-mobile-active" : "filter-food"
          }
        >
          {!isMobileNavigation || mobileFilteringActive ? (
            <p className="filter-option-foodtype">Filter </p>
          ) : null}

          <div className="filter-order-flex-div">
            {foodTypes
              ? foodTypes.map((food, id) => {
                  return (
                    <ul
                      key={id}
                      className={
                        mobileFilteringActive
                          ? "filter-food-items-mobile"
                          : "filter-food-items"
                      }
                    >
                      <li
                        onClick={() => {
                          handleFoodFiltering(food);

                          if (foodTypeActive === id) {
                            setFoodTypeActive(null);
                            setmobileFilteringActive(false);
                          } else setFoodTypeActive(id);
                          setmobileFilteringActive(false);
                        }}
                        key={id}
                        id={
                          foodTypeActive === id
                            ? "food-type-active"
                            : "food-type"
                        }
                      >
                        {food.foodType}
                        {user?.admin && (
                          <button
                            id="food-type-delete-button"
                            onClick={() => handleDeleteFoodType(food)}
                          >
                            <RiDeleteBinLine size="24" />
                          </button>
                        )}
                      </li>
                    </ul>
                  );
                })
              : null}
          </div>

          {!isMobileNavigation || mobileFilteringActive ? (
            <div className="filter-order-flex-div">
              <p className="order-by-rating">Order by</p>

              <button
                className={`order-by-rating-arrows ${
                  descendingSorting ? "toggle" : ""
                }`}
                onClick={() => handleDescendingSorting()}
              >
                Rating <AiOutlineArrowDown size={22} />
              </button>

              <button
                className={`order-by-rating-arrows ${
                  ascendingSorting ? "toggle" : ""
                }`}
                onClick={() => handleAscendingSorting()}
              >
                Rating <AiOutlineArrowUp size={22} />{" "}
              </button>
            </div>
          ) : null}
        </ul>
      </div>

      <div
        className={`filtering-dark-background ${
          mobileFilteringActive ? "show" : ""
        }`}
      />
    </React.Fragment>
  );
};

export default Filtering;
