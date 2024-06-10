import React, { Component } from "react";
import Like from "./Like";
import NewFood from "./NewFood";
import Comments from "./Comments";
import SpinningBurger from "./utility/SpinningBurger";
import deleteFood from "./Api/deleteFood";
import getFoods from "./Api/getFoods";
import likeFood from "./Api/likeFood";
import createComment from "./Api/createComment";
import getComments from "./Api/getComments";
import deleteComment from "./Api/deleteComment";
import getFoodTypes from "./Api/getFoodTypes";
import getLikes from "./Api/getLikes";
import { BiCommentDetail, BiCommentX, BiFoodMenu } from "react-icons/bi";
import { RiArrowDropUpLine } from "react-icons/ri";
import { BsFillGridFill } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import "../styles/FoodDisplay.css";

class FoodDisplay extends Component {
  state = {
    Foods: [],
    SearchBar: "",
    FoodTypes: [],
    ShowComments: false,
    ShowCommentsById: null,
    FoodTypesDisplay: [],
    Comments: [],
    Likes: [],
    NumberStars: 5,
    StarDimension: "28",
    GridLayout: false,
    FoodLoaded: false,
  };
  // make api calls
  async componentDidMount() {
    const Comments = await getComments();
    const FoodTypes = await getFoodTypes();
    const Likes = await getLikes();
    const Foods = await getFoods();
    if (Foods) {
      this.setState({ FoodLoaded: true });
    }
    this.setState({
      FoodTypes: FoodTypes,
      Foods: Foods,
      Comments: Comments,
      FoodTypesDisplay: FoodTypes,
      Likes: Likes,
    });
  }
  //open new food form
  toggleNewFoodForm = () => {
    this.props.setfoodFormOpen(!this.props.foodformopen);
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
    if (this.state.ShowCommentsById === food.id) {
      this.setState({ ShowCommentsById: null });
    } else if (!this.state.ShowComments) {
      this.setState({ ShowCommentsById: food.id, ShowComments: true });
    } else this.setState({ ShowCommentsById: food.id, ShowComments: true });
  };
  //delete Comment
  handleDeleteComment = async (comment, user) => {
    const oldComments = this.state.Comments;
    const newComments = oldComments.filter(
      (deleteComment) => deleteComment !== comment
    );
    this.setState({ Comments: newComments });
    deleteComment(comment.id, user);
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

  render() {
    if (this.props.user) {
      var { admin, id, username } = this.props.user;
    }
    return (
      <div className="food-display">
        {this.props.foodFormOpen && (
          <NewFood
            setfoodFormOpen={this.props.setfoodFormOpen}
            foodTypesDisplay={this.state.FoodTypesDisplay}
          />
        )}
        <div className="flex-row">
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
          className={this.state.GridLayout ? "food-items-grid" : "flex-column"}
        >
          {this.state.FoodLoaded ? (
            this.state.Foods.filter((food) => {
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
                if (this.props.descendingSorting === true) {
                  return a.foodRating < b.foodRating ? -1 : 1;
                } else if (this.props.ascendingSorting === true) {
                  return a.foodRating < b.foodRating ? 1 : -1;
                }
              })
              .map((food) => {
                const showComments = food.id === this.state.ShowCommentsById;
                return (
                  <div className="map-food-items-comments" key={food.id}>
                    <div className="map-food-items">
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
                          <img
                            id="food-img"
                            src={`${process.env.REACT_APP_APIENDPOINT}/${food.foodImage}`}
                            alt=""
                          />
                        </ul>{" "}
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
                              <span className="price-meal-wrap">
                                {food.foodCostMeal &&
                                  "(Meal) " + food.foodCostMeal + "€"}
                              </span>
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
                          <div className="flex-row">
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
                                {this.props.isMobile && "Comments"}
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
                              Likes={this.state.Likes}
                              handleLike={this.handleLike}
                            />
                          </div>{" "}
                        </ul>
                      </div>
                    </div>
                    {showComments && (
                      <Comments
                        username={username}
                        admin={admin}
                        foodId={food.id}
                        food={food}
                        UserId={id}
                        Comments={this.state.Comments}
                        handleDeleteComment={this.handleDeleteComment}
                        handleCreateComment={this.handleCreateComment}
                        toggleComments={this.toggleComments}
                      />
                    )}
                    {showComments && (
                      <button
                        onClick={() => this.toggleComments(food)}
                        className="comment-collapse-button"
                      >
                        <RiArrowDropUpLine size={48} />
                      </button>
                    )}
                  </div>
                );
              })
          ) : (
            <SpinningBurger />
          )}
        </div>
      </div>
    );
  }
}

export default FoodDisplay;
