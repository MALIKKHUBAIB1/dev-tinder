const express = require("express");
const { isUserAuthenticated } = require("../utils/middleware/auth");
const { connectToDataBase } = require("./config/database");
const User = require("./models/user");
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const { firstName, lastName, age, gender, password, email } = userData;
    const isDataValid = [
      firstName,
      lastName,
      age,
      gender,
      password,
      email,
    ].some((isValid) => {
      if (!isValid) return true;
    });
    // console.log(userData);

    console.log(isDataValid);
    if (isDataValid) {
      res.status(400).send("please enter a valid  address feild");
      return;
    }
    const findUser = await User.findOne({ $or: [{ email }, { password }] });
    if (findUser) {
      res.status(401).send("user already exists");
      return;
    }
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
