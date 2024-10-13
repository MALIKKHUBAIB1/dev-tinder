const express = require("express");
const { isUserAuthenticated } = require("../utils/middleware/auth");
const { connectToDataBase } = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userData = {
    firstName: "Jhon",
    lastName: "Doe",
    age: 34,
    gender: "Male",
    password: "password",
    email: "email@example.com",
  };
  try {
    const user = await new User(userData);
    user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("error while saving the user " + error.message);
  }
});
connectToDataBase()
  .then(() => {
    console.log("DataBase Connected successfully");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
