const express = require("express");
const Login = express.Router();
const passport = require("passport");

Login.post("/", passport.authenticate("local"), (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.error(error);
  }
});

Login.post("/logout", (req, res, next) => {
  try {
    req.logOut();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

 Login.get("/wasLogged", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(req.user);
})

module.exports = Login;
