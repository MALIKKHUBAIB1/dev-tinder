const express = require("express");
const { isUserAuthenticated } = require("../utils/middleware/auth");
const { connectToDataBase } = require("./config/database");
var validator = require("validator");

const User = require("./models/user");
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//singup user
app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const { firstName, lastName, age, gender, password, email } = userData;
    if (![firstName, lastName, age, gender, password, email].every(Boolean)) {
      return res
        .status(404)
        .send("invalid feild please fill the feild with valid values");
    }
    if (!["male", "female", "others"].includes(gender)) {
      return res.status(401).send("invalid gender feild");
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(401).send("user already exists");
    }
    const user = new User(userData);
    await user.save();
    res.status(200).send("user created successfully");
  } catch (error) {
    res.status(400).send("error while saving the user " + error.message);
  }
});
// get user by email
app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});
//get all the user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("user not found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});
// delete the usr by email
app.delete("/user", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(404).send("please enter a valid email");
    } else {
      const user = await User.findOneAndDelete({ email });
      if (!user) {
        res.status(404).send("user not found");
      }
      console.log(user);
      res.status(200).send(user.email + " deleted successfully");
    }
  } catch (error) {
    res.status(401).send(error.message || "something went wrong");
  }
});

// update the user by email or id
app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(401).send("enter a valid id ");
    }

    const ALLOWED_UPDATES = [
      "id",
      "gender",
      "skills",
      "age",
      "firstName",
      "lastName",
      "photoUrl",
    ];
    const isAllowedValid = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (req.body?.skills.length > 10) {
      return res.status(401).send("the skill length should less then 10");
    }
    if (!isAllowedValid) {
      return res.status(401).send("you can not update this feild");
    }

    const user = await User.findByIdAndUpdate(id, data, {
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).send("user updated successfully");
  } catch (error) {
    res.status(401).send(error.message + " some error");
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
