import React, { Component } from "react";
import createNewFoodType from "../Api/createNewFoodType";
import getFoodTypes from "../Api/getFoodTypes";
import deleteFoodType from "../Api/deleteFoodType";
import { RxDoubleArrowRight } from "react-icons/rx";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import "../../styles/Filtering.css";

class Filtering extends Component {
  state = {
    foodTypes: [
      {
        id: 13,
        foodType: "Pizza",
        createdAt: "2023-06-25T12:41:34.000Z",
        updatedAt: "2023-06-25T12:41:34.000Z",
      },
      {
        id: 14,
        foodType: "Kebab",
        createdAt: "2023-06-25T12:41:37.000Z",
        updatedAt: "2023-06-25T12:41:37.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      ,
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
      {
        id: 16,
        foodType: "Hamburger",
        createdAt: "2023-07-24T11:23:13.000Z",
        updatedAt: "2023-07-24T11:23:13.000Z",
      },
    ],
    clickedFoodType: "",
    newFoodType: "",
    foodTypeActive: null,
    mobileFilteringActive: false,
    width: window.innerWidth,
    Sorting: null,
  };
  constructor(props) {
    super(props);
    this.outsideRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  async componentDidMount() {
    //const data = await getFoodTypes();
    //this.setState({ foodTypes: data });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleFoodFiltering = (food) => {
    if (this.state.clickedFoodType === food.foodType) {
      this.setState({ clickedFoodType: "" });
      this.props.setSelectedFoodType("");
    } else this.props.setSelectedFoodType(food.foodType);
    this.setState({ clickedFoodType: food.foodType });
  };

  handleDeleteFoodType = async (foodType) => {
    const oldFoodTypes = this.state.foodTypes;
    const newFoodTypes = oldFoodTypes.filter(
      (deleteFoodType) => deleteFoodType !== foodType
    );
    this.setState({ foodTypes: newFoodTypes });
    deleteFoodType(foodType.id);
  };
  handleToggleMobileMenu = () => {
    this.setState({ mobileFilteringActive: true });
  };

  //close mobile navigation
  handleClickOutside(event) {
    if (this.outsideRef && !this.outsideRef.current.contains(event.target)) {
      this.setState({
        mobileFilteringActive: false,
      });
    }
  }
  render() {
    if (this.props.user) {
      var { admin } = this.props.user;
    }
    return (
      <React.Fragment>
        <div
          className={
            !this.state.mobileFilteringActive ? "filtering" : "filtering-mobile"
          }
        >
          <ul
            className={
              this.state.mobileFilteringActive
                ? "filter-food-mobile-active"
                : "filter-food"
            }
            ref={this.outsideRef}
          >
            <li>
              {this.props.isMobileNavigation ? null : !this.state
                  .mobileFilteringActive ? (
                <RxDoubleArrowRight
                  className="open-mobile-filter"
                  size={40}
                  onClick={() => this.handleToggleMobileMenu()}
                />
              ) : null}
            </li>
            {this.props.isMobileNavigation ||
            this.state.mobileFilteringActive ? (
              <p className="filter-option-foodtype">Filter </p>
            ) : null}

            <div className="test">
              {this.state.foodTypes
                ? this.state.foodTypes.map((food, id) => {
                    return (
                      <ul
                        key={id}
                        className={
                          this.state.mobileFilteringActive
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
            {this.props.isMobileNavigation ||
            this.state.mobileFilteringActive ? (
              <p className="filter-option-rating">Order by</p>
            ) : null}
            {this.props.isMobileNavigation ||
            this.state.mobileFilteringActive ? (
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
            {admin && (
              <form onSubmit={() => createNewFoodType(this.state.newFoodType)}>
                <input
                  onChange={(e) => {
                    this.setState({ newFoodType: e.target.value });
                  }}
                ></input>
                <button type="submit">Add</button>
              </form>
            )}
          </ul>
        </div>

        <div
          className={`filtering-dark-background ${
            this.state.mobileFilteringActive ? "show" : ""
          }`}
        />
      </React.Fragment>
    );
  }
}

export default Filtering;
