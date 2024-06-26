import React, { useState } from "react";
import createFood from "./Api/createFood";
import createFoodV2 from "./Api/createFoodV2";
import "../styles/NewFood.css";

function NewFood({ foodTypesDisplay, setfoodFormOpen }) {
  const [foodName, setfoodName] = useState("junkfood");
  const [foodType, setfoodType] = useState("Unkown");
  const [foodDescription, setfoodDescription] = useState("some unknown food");
  const [foodAddress, setfoodAddress] = useState("");
  const [foodImage, setfoodImage] = useState("");
  const [foodRating, setfoodRating] = useState(1);
  const [foodCost, setfoodCost] = useState(0);
  const [foodCostMeal, setfoodCostMeal] = useState();

  return (
    <div className="create-new-food">
      <form
        className="flex-column"
        onSubmit={() =>
          createFoodV2(
            foodName,
            foodType,
            foodDescription,
            //foodAddress,
            //foodImage
            foodRating,
            foodCost,
            foodCostMeal
          )
        }
        encType="multipart/form-data"
      >
        <button id="close-food-form" onClick={() => setfoodFormOpen(false)}>
          &#x2715;
        </button>
        <h3 id="add-food-header">Add food</h3>
        <label className="field-name-labels">Name</label>
        <input
          onChange={(e) => {
            setfoodName(e.target.value);
          }}
          id="input-food-name"
          placeholder="Double quarter pounder"
          name="foodName"
        ></input>

        <label className="field-name-labels">Type</label>
        <select
          id="input-food-type"
          name="foodType"
          onChange={(e) => setfoodType(e.target.value)}
          placeholder="Unknown"
        >
          {foodTypesDisplay.map((foodType, id) => (
            <option key={id} value={foodType.foodType}>
              {foodType.foodType}
            </option>
          ))}
        </select>

        <label className="field-name-labels">Description</label>
        <textarea
          onChange={(e) => {
            setfoodDescription(e.target.value);
          }}
          id="input-food-description"
          placeholder="amazing burger with big patties"
          name="foodDescription"
        ></textarea>

        <input
          onChange={(e) => {
            setfoodAddress(e.target.value);
          }}
          id="input-food-name"
          placeholder="Storgatan 9, 68600 Pietarsaari"
          name="foodAddress"
        ></input>
        <div>
          <label>Price </label>
          <input
            onChange={(e) => {
              setfoodCost(e.target.value);
            }}
            type="number"
            id="input-food-cost"
            placeholder="1"
            name="foodCost"
            step="any"
          ></input>
        </div>
        <div>
          <label> Price Meal</label>

          <input
            onChange={(e) => {
              setfoodCostMeal(e.target.value);
            }}
            id="input-food-cost-meal"
            placeholder=""
            type="number"
            name="foodCostMeal"
            step="any"
          ></input>
        </div>
        <input
          id="input-food-image"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="foodImage"
          onChange={(e) => {
            setfoodImage(e.target.files[0]);
          }}
        />
        <div>
          <label>Rating</label>
          <input
            id="input-food-rating"
            type="number"
            min="1"
            max="5"
            name="foodRating"
            placeholder="1"
            onChange={(e) => {
              setfoodRating(e.target.value);
            }}
          />
        </div>
        <button type="Submit" value="Submit" id="submit-button">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewFood;
