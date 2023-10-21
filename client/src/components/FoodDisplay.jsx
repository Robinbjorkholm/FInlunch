import React, { Component } from "react";
import Like from "./Like";
import NewFood from "./NewFood";
import Comments from "./Comments";
import deleteFood from "./Api/DeleteFood";
import getFoods from "./Api/getFoods";
import likeFood from "./Api/likeFood";
import createComment from "./Api/createComment";
import getComments from "./Api/getComments";
import deleteComment from "./Api/deleteComment";
import getFoodTypes from "./Api/getFoodTypes";
import getLikes from "./Api/getLikes";
import { BiCommentDetail, BiCommentX, BiFoodMenu } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import Geocode from "react-geocode";
import { motion } from "framer-motion";
import "../styles/FoodDisplay.css";

class FoodDisplay extends Component {
  state = {
    Foods: [
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "",
        foodDescription:
          "texas monster dsadsd dsaadhlkjjjjjjjjjjjjjjjjjjhjklklklklklklklklklklklklklklsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 5,
        foodType: "pizzdddddddddddddddddddddddddddddddda",
        id: 1,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "15.90",
        foodDescription: "texas monster dsadsd dsaadsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 5,
        foodType: "pizza",
        id: 2,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "15.90",
        foodDescription: "texas monster dsadsd dsaadsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 5,
        foodType: "pizza",
        id: 3,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "15.90",
        foodDescription: "texas monster dsadsd dsaadsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 4,
        foodType: "pizza",
        id: 4,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "15.90",
        foodDescription: "texas monster dsadsd dsaadsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 3,
        foodType: "pizza",
        id: 5,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Ototo Malmsgatan 16, 68600 Jakobstad",
        foodCost: "1.90",
        foodCostMeal: "143.90",
        foodDescription: "asdadsadsdsa",
        foodImage: "images\\1694466075470.jpg",
        foodName: "asddadsdasdadsadsadsadsadsadsas",
        foodRating: 5,
        foodType: "Kebab",
        id: 6,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
      {
        createdAt: "2023-09-11T21:01:15.000Z",
        foodAddress: "Otto Malmsgatan 16, 68600 Jakobstad",
        foodCost: "14.90",
        foodCostMeal: "15.90",
        foodDescription: "texas monster dsadsd dsaadsdasdasdas",
        foodImage: "images\\1694466075470.jpg",
        foodName: "texas monster",
        foodRating: 1,
        foodType: "pizza",
        id: 7,
        updatedAt: "2023-09-11T21:01:15.000Z",
      },
    ],
    FoodFormOpen: false,
    SearchBar: "",
    ShowComments: false,
    ShowCommentsById: null,
    FoodTypesDisplay: [],
    Comments: [
      {
        User: { username: "osheezero", id: 1 },
        UserId: 1,
        comment: "fdsafsdfsd",
        createdAt: "2023-10-18T13:34:30.000Z",
        foodId: 1,
        id: 1,
        updatedAt: "2023-10-18T13:34:30.000Z",
        username: "osheezero",
      },
    ],
    Likes: [],
    NumberStars: 5,
    StarDimension: 28,
    GridLayout: false,
  };

  /*async componentDidMount() {
    const Comments = await getComments();
    const FoodTypes = await getFoodTypes();
    const Likes = await getLikes();
    const Foods = await getFoods();
    console.log(Foods);
    this.setState({
      Foods: Foods,
      Comments: Comments,
      FoodTypesDisplay: FoodTypes,
      Likes: Likes,
    });
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }*/
  //resize window for number of stars to fit mobile

  //open new food form
  toggleNewFoodForm = () => {
    this.setState({ FoodFormOpen: !this.state.FoodFormOpen });
  };
  //delete food
  handleDelete = async (food) => {
    const oldFoods = this.state.Foods;
    const newFoods = oldFoods.filter((deleteFood) => deleteFood !== food);
    this.setState({ Foods: newFoods });
    deleteFood(food.id);
  };
  //toggle comments
  toggleComments = (food) => {
    if (!this.state.ShowComments) {
      this.setState({ ShowCommentsById: food.id, ShowComments: true });
    } else this.setState({ ShowCommentsById: null, ShowComments: false });
  };
  //delete Comment
  handleDeleteComment = async (comment) => {
    const oldComments = this.state.Comments;
    const newComments = oldComments.filter(
      (deleteComment) => deleteComment !== comment
    );
    this.setState({ Comments: newComments });
    deleteComment(comment.id);
  };
  //create Comment
  handleCreateComment = async (Comment, foodId, UserId, username) => {
    createComment(Comment, foodId, UserId, username).then((res) => {
      const newComments = [...this.state.Comments, res.data];
      this.setState({ Comments: newComments });
    });
  };
  //calculate amount of comments for food
  commentAmount(food) {
    const comments = this.state.Comments.filter(
      (comment) => food === comment.foodId
    );
    return comments.length;
  }
  //delete or create like
  handleLike = async (foodId, UserId) => {
    likeFood(foodId, UserId).then((res) => {
      const result = res.data;
      if (result === true) {
        const newLikes = [...this.state.Likes, { foodId: foodId }];
        this.setState({ Likes: newLikes });
      } else {
        const unlike = this.state.Likes.filter(
          (like) => like.foodId !== foodId
        );
        unlike.slice(0, -1);
        this.setState({ Likes: unlike });
      }
    });
  };
  //calculate distance to restaurant (in a straight line)
  /*calculateDistance = async (address) => {
    if (!address) {
      return;
    } else {
      let res = await Geocode.fromAddress(address)
        .then(
          (response) => {
            function deg2rad(deg) {
              return deg * (Math.PI / 180);
            }
            const { lat, lng } = response.results[0].geometry.location;

            var dLat = deg2rad(lat - this.props.userLocationLat);
            var dLon = deg2rad(lng - this.props.userLocationLng);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(this.props.userLocationLat)) *
                Math.cos(deg2rad(lat)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = 6371 * c;
            console.log(distance);
            return distance;
          },
          (err) => {
            console.error(err);
          }
        )
      return res;
    }
  };*/

  // choose between flex and grid layout
  /*   <div className="div-option-grid-flex">
            <BsFillGridFill
              size={24}
              onClick={() =>
                this.setState({ GridLayout: !this.state.GridLayout })
              }
            />
          </div>*/

  render() {
    if (this.props.user) {
      var { admin, id, username } = this.props.user;
    }
    return (
      <div className="food-display">
        {admin && (
          <button id="open-food-form" onClick={() => this.toggleNewFoodForm()}>
            New Food
          </button>
        )}

        {this.state.FoodFormOpen ? (
          <NewFood
            closeFoodForm={this.toggleNewFoodForm}
            foodTypesDisplay={this.state.FoodTypesDisplay}
          />
        ) : null}
        <div className="food-display-find-food">
          <form id="search-form">
            <input
              type="text"
              placeholder="Search..."
              id="search-bar"
              name="searchBar"
              onChange={(event) =>
                this.setState({ SearchBar: event.target.value })
              }
            ></input>
          </form>
        </div>
        <div
          className={
            this.state.GridLayout ? "food-items-grid" : "food-items-flex"
          }
        >
          {this.state.Foods
            ? this.state.Foods.filter((food) => {
                if (this.props.selectedFoodType) {
                  return food.foodType
                    .toLowerCase()
                    .includes(this.props.selectedFoodType.toLowerCase());
                }
                if (this.state.SearchBar === "") {
                  return food;
                } else if (
                  food.foodName
                    .toLowerCase()
                    .includes(this.state.SearchBar.toLowerCase()) ||
                  food.foodType
                    .toLowerCase()
                    .includes(this.state.SearchBar.toLowerCase())
                ) {
                  return food;
                }
              })
                .sort((a, b) => {
                  if (this.props.descending === true) {
                    return a.foodRating < b.foodRating ? -1 : 1;
                  } else if (this.props.ascending === true) {
                    return a.foodRating < b.foodRating ? 1 : -1;
                  }
                })
                .map((food) => {
                  const showComments = food.id === this.state.ShowCommentsById;
                  return (
                    <div className="map-food-items" key={food.id}>
                      {admin && (
                        <button
                          className="delete-food-button"
                          onClick={() => this.handleDelete(food)}
                        >
                          &times;
                        </button>
                      )}
                      <div className="food-img-info-divider">
                        <ul className="ul-food-items-info">
                          <div>
                            <img
                              id="food-img"
                              src={`${process.env.REACT_APP_APIENDPOINT}/${food.foodImage}`}
                            />
                          </div>
                        </ul>
                      </div>
                      <div className="food-img-info-divider">
                        <ul className="ul-food-items-info">
                          <li>
                            <h1 className="food-header">{food.foodName}</h1>
                          </li>

                          <li className="li-icon-info-div">
                            <BiFoodMenu size={"1.3em"} />
                            &nbsp;
                            <p className="food-type-price-info">
                              {food.foodType}
                            </p>{" "}
                          </li>
                          <li className="li-icon-info-div">
                            <AiOutlineDollarCircle size={"1.3em"} />
                            &nbsp;
                            <p className="food-type-price-info">
                              {food.foodCost}€&nbsp;
                              <p className="price-meal-wrap">
                                {food.foodCostMeal
                                  ? "(Meal) " + food.foodCostMeal + "€"
                                  : null}
                              </p>
                            </p>
                          </li>
                          <li>
                            <div id="food-description-box">
                              <p id="food-description-box-text">
                                {food.foodDescription}
                              </p>
                            </div>
                          </li>
                          <li className="rating">
                            <StarRatings
                              starDimension={this.state.StarDimension}
                              rating={food.foodRating}
                              starRatedColor="gold"
                              changeRating={this.changeRating}
                              numberOfStars={this.state.NumberStars}
                            />
                          </li>
                        </ul>
                        <div className="div-comments">
                          <div>
                            <button
                              onClick={() => this.toggleComments(food)}
                              className="comments-amount"
                            >
                              <u> {this.commentAmount(food.id)}</u>&nbsp;
                            </button>
                            <button
                              onClick={() => this.toggleComments(food)}
                              className="show-comments"
                            >
                              {this.props.isMobile ? "Comments" : null}
                              {showComments ? (
                                <BiCommentX
                                  className="comments-show-hide"
                                  size={24}
                                />
                              ) : (
                                <BiCommentDetail
                                  className="comments-show-hide"
                                  size={24}
                                />
                              )}
                            </button>
                          </div>
                          <Like
                            foodId={food.id}
                            UserId={id}
                            user={this.props.user}
                            Likes={this.state.Likes}
                            handleLike={this.handleLike}
                          />
                        </div>
                        {showComments ? (
                          <Comments
                            user={this.props.user}
                            username={username}
                            admin={admin}
                            foodId={food.id}
                            UserId={id}
                            Comments={this.state.Comments}
                            handleDeleteComment={this.handleDeleteComment}
                            handleCreateComment={this.handleCreateComment}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })
            : null}
        </div>
      </div>
    );
  }
}

export default FoodDisplay;
