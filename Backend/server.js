const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("./images"));
app.set("view engine", "ejs");

require("dotenv").config();
require(".//cors")(app);
require("./routes/routes")(app);

const port = process.env.PORT;
app.listen(port || 3001, () => {
  console.log(`server running on port ${port}`);
});
