const Users = require("../models/user");
const sendConfirmationEmail = require("./sendConfirmationEmail");
const EmailToken = require("../models/emailConfirmationToken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCurrentUser = async (req, res) => {
  const currentUser = await Users.findOne({
    attributes: { exclude: ["password"] },
    where: { username: req.user.username },
  });
  res.send(currentUser);
};

const registerUser = async (req, res) => {
  let user = await Users.findOne({
    where: { username: req.body.username },
  });
  if (user) return res.status(400).send("Username already registered");
  let userEmail = await Users.findOne({
    where: { userEmail: req.body.email },
  });
  if (userEmail) return res.status(400).send("Email already registered");

  const newUser = await bcrypt.hash(req.body.password, 10).then((hash) => {
    return Users.create({
      username: req.body.username,
      password: hash,
      userEmail: req.body.email,
      admin: false,
      isConfirmed: false,
    });
  });

  let createToken = await EmailToken.create({
    userId: newUser.id,
    emailToken: crypto.randomBytes(16).toString("hex"),
  });

  if (createToken) {
    console.log("asdasd", createToken.emailToken);
    sendConfirmationEmail({
      from: "finlunch.com",
      to: req.body.email,
      subject: "Account verification link",
      text: `Hello, ${req.body.username} please verify your account by clicking this link - http://localhost:3000/VerifyEmail/${newUser.id}/${createToken.emailToken}`,
    });
  } else {
    return res.status(400).send("error creating token");
  }
  const Token = newUser.generateToken();
  res.header("x-authToken", Token).send(Token);
};

const loginUser = async (req, res) => {
  let user = await Users.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("incorrect username or password");
  if (user.isConfirmed === false)
    return res.status(400).send("Email confirmation is required to login!");

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("incorrect password");

  const Token = user.generateToken();

  res.send(Token);
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const usertoken = await EmailToken.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(usertoken);

    if (usertoken) {
      var user = await Users.findOne({ where: { id: req.params.id } });
    } else {
      return res.status(400).send("token not found");
    }

    if (user) {
      const update = await Users.update(
        { isConfirmed: true },
        {
          where: {
            id: usertoken.userId,
          },
        }
      );

      return res
        .status(200)
        .send("Thank you for verifying you can now use your account");
    } else {
      return res.status(401).send("user not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  verifyEmail,
};
