const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  const Token = req.header("x-authToken");
  if (!Token) return res.status(401).send("No token");

  try {
    const decodedToken = jwt.verify(Token, process.env.JWTPRIVATEKEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).send("Bad token");
  }
};

module.exports = authorization;
