const express = require("express");
const app = express();
const mysql = require("mysql2");
const food = require("./routes/foods");
const user = require("./routes/users");
const comment = require("./routes/comments");
const foodTypes = require("./routes/foodTypes");
const like = require("./routes/likes");
const port = process.env.PORT;
const cors = require("cors");


// CORS
app.use(
  cors({
    origin: "https://superlative-cheesecake-27dd1d.netlify.app",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://superlative-cheesecake-27dd1d.netlify.app"
  );
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
// CORS 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("/images"));
app.set("view engine", "ejs");
// ROUTES // ROUTES // ROUTES // ROUTES 
app.use("/foods", food);
app.use("/users", user);
app.use("/comments", comment);
app.use("/foodTypes", foodTypes);
app.use("/likes", like);

app.listen(port || 3001, () => {
  console.log(`server running on port ${port}`);
});
