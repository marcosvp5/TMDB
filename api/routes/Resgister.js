const express = require("express");
const Register = express.Router();
const User = require('../models/User')



Register.post("/", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const controlWasRegistered = await User.findAll({ where: { email } });
    if(controlWasRegistered[0]){
      res.status(400).send("email already in use");
    }else{
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
    })
    res.status(201).send(newUser);
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = Register;