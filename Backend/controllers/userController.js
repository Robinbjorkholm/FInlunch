const Users = require("../models/user");
const sendConfirmationEmail = require("./sendConfirmationEmail");
const EmailToken = require("../models/emailToken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//gets the current user, never used
const getCurrentUser = async (req, res) => {
  const currentUser = await Users.findOne({
    attributes: { exclude: ["password"] },
    where: { username: req.user.username },
  });
  res.send(currentUser);
};

//create a new user account and send a verification link to their email address containing a email token
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
    UserId: newUser.id,
    emailToken: crypto.randomBytes(16).toString("hex"),
  });

  if (createToken) {
    sendConfirmationEmail({
      from: "finlunch.com",
      to: req.body.email,
      subject: "Account verification link",
      text: `Hello, ${req.body.username} please verify your account by clicking this link - ${process.env.BASE_URL_FRONTEND}/verifyEmail/${newUser.id}/${createToken.emailToken}`,
    });
  } else {
    return res.status(400).send("error creating token");
  }
  const Token = newUser.generateToken();
  res.header("x-authToken", Token).send(Token);
};

// login the user
const loginUser = async (req, res) => {
  let user = await Users.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("incorrect username or password");
  if (user.isConfirmed === false)
    return res.status(400).send("Email confirmation is required to login!");

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("incorrect username or password");

  const Token = user.generateToken();

  res.send(Token);
};

// verify the token that the user sent for verifying their account
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const usertoken = await EmailToken.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    if (usertoken) {
      var user = await Users.findOne({ where: { id: req.params.id } });
    } else {
      return res.status(404).send("token not found");
    }

    if (user) {
      const update = await Users.update(
        { isConfirmed: true },
        {
          where: {
            id: usertoken.UserId,
          },
        }
      );
      return res
        .status(200)
        .send("Thank you for verifying you can now use your account");
    } else {
      return res.status(404).send("user not found");
    }
  } catch (error) {
    console.log(error);
  }
};

// send email with reset password link
const sendResetEmail = async (req, res) => {
  let user = await Users.findOne({ where: { userEmail: req.body.email } });
  if (!user) {
    return res.status(404).send("We can't find a user with that email address");
  }
  let createToken = await EmailToken.create({
    UserId: user.id,
    emailToken: crypto.randomBytes(16).toString("hex"),
  });

  if (createToken) {
    sendConfirmationEmail({
      from: "finlunch.com",
      to: req.body.email,
      subject: "Reset Password link",
      text: `Hello ${user.username} 
      
You can reset your password by clicking this link - ${process.env.BASE_URL_FRONTEND}/ResetPassword/${user.id}/${createToken.emailToken}

If this was a mistake, just ignore this email nothing will happen.

`,
    });
    res.status(200).send("an email has been sent to " + req.body.email);
  } else {
    return res.status(400).send("error creating token");
  }
};

//reset the users password
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const usertoken = await EmailToken.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });

    if (usertoken) {
      var user = await Users.findOne({ where: { id: req.params.id } });
    } else {
      return res.status(400).send("token not found");
    }

    if (user) {
      const update = await bcrypt.hash(req.body.password, 10).then((hash) => {
        return Users.update(
          {
            password: hash,
          },
          {
            where: {
              id: usertoken.UserId,
            },
          }
        );
      });

      return res.status(200).send("You have successfully reset your password ");
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
  sendResetEmail,
  resetPassword,
};
