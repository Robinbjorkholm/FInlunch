import React, { Component } from "react";

import getFoodTypes from "../Api/getFoodTypes";
import deleteFoodType from "../Api/deleteFoodType";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import "../../styles/Filtering.css";

class Filtering extends Component {
  state = {
    foodTypes: [],
    clickedFoodType: "",
    newFoodType: "",
    foodTypeActive: null,
    mobileFilteringActive: false,
    width: window.innerWidth,
    Sorting: null,
  };
  async componentDidMount() {
    const foodTypes = await getFoodTypes();
    this.setState({
      foodTypes: foodTypes,
    });
  }
  //choose which food type to show
  handleFoodFiltering = (food) => {
    if (this.state.clickedFoodType === food.foodType) {
      this.setState({ clickedFoodType: "" });
      this.props.setSelectedFoodType("");
    } else this.props.setSelectedFoodType(food.foodType);
    this.setState({ clickedFoodType: food.foodType });
  };
  //Delete food type from list
  handleDeleteFoodType = async (foodType) => {
    const oldFoodTypes = this.state.foodTypes;
    const newFoodTypes = oldFoodTypes.filter(
      (deleteFoodType) => deleteFoodType !== foodType
    );
    this.setState({ foodTypes: newFoodTypes });
    deleteFoodType(foodType.id);
  };

  render() {
    if (this.props.user) {
      var { admin } = this.props.user;
    }
    return (
      <React.Fragment>
        <div
          className={
            !this.props.mobileFilteringActive ? "filtering" : "filtering-mobile"
          }
          ref={this.props.navigationRef}
        >
          <ul
            className={
              this.props.mobileFilteringActive
                ? "filter-food-mobile-active"
                : "filter-food"
            }
          >
            {!this.props.isMobileNavigation ||
            this.props.mobileFilteringActive ? (
              <p className="filter-option-foodtype">Filter </p>
            ) : null}

            <div className="filter-div-map">
              {this.state.foodTypes
                ? this.state.foodTypes.map((food, id) => {
                    return (
                      <ul
                        key={id}
                        className={
                          this.props.mobileFilteringActive
                            ? "filter-food-items-mobile"
                            : "filter-food-items"
                        }
                      >
                        <li
                          onClick={() => {
                            this.handleFoodFiltering(food);

                            if (this.state.foodTypeActive === id) {
                              this.setState({ foodTypeActive: null });
                              this.setState({
                                mobileFilteringActive: false,
                              });
                            } else this.setState({ foodTypeActive: id });
                            this.setState({
                              mobileFilteringActive: false,
                            });
                          }}
                          key={id}
                          id={
                            this.state.foodTypeActive === id
                              ? "food-type-active"
                              : "food-type"
                          }
                        >
                          {food.foodType}
                          {admin && (
                            <button
                              id="food-type-delete-button"
                              onClick={() => this.handleDeleteFoodType(food)}
                            >
                              X
                            </button>
                          )}
                        </li>
                      </ul>
                    );
                  })
                : null}
            </div>
            {!this.props.isMobileNavigation ||
            this.props.mobileFilteringActive ? (
              <p className="filter-option-rating">Order by</p>
            ) : null}
            {!this.props.isMobileNavigation ||
            this.props.mobileFilteringActive ? (
              <div className="div-filter-rating-text-arrow">
                <button
                  className={
                    this.props.descending
                      ? "filter-option-rating-arrows-toggle"
                      : "filter-option-rating-arrows"
                  }
                  onClick={() => this.props.handleDescending()}
                >
                  Rating{" "}
                  <AiOutlineArrowDown className="filter-arrow" size={22} />
                </button>

                <button
                  className={
                    this.props.ascending
                      ? "filter-option-rating-arrows-toggle"
                      : "filter-option-rating-arrows"
                  }
                  onClick={() => this.props.handleAscending()}
                >
                  Rating <AiOutlineArrowUp className="filter-arrow" size={22} />{" "}
                </button>
              </div>
            ) : null}
          </ul>
        </div>

        <div
          className={`filtering-dark-background ${
            this.props.mobileFilteringActive ? "show" : ""
          }`}
        />
      </React.Fragment>
    );
  }
}

export default Filtering;
