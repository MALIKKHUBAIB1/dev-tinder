const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const User = require("../models/user");
const routerRequest = express.Router();

routerRequest.post("/sendconnection", isUserAuthenticated, async (req, res) => {
  const id = req._id;
  const user = await User.findById(id);
  if (!user) {
    throw new Error("can not find the id please login again ");
  }
  res.status(200).send(user.firstName + " " + user.skills);
});

module.exports = routerRequest;
