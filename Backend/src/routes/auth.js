const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { signupValidation } = require("../../utils/validation");
const User = require(".././models/user");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
//singup user
authRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).send("Password or email cannot be empty.");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send("Invalid credentials");
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password. Please try again.");
    }

    const token = existingUser.getJwt();

    // Set the token in an httpOnly cookie for secure access
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 3600000), // 1 hour
    });

    // Send success status without returning the token in response body
    res.status(200).json({ data: existingUser, message: "Login successful." });
  } catch (error) {
    res.status(500).send("Something went wrong: " + error);
  }
});

authRouter.post("/logout", async (req, res) => {
  // check is user logedin already or not
  // if the user is loggdein the proceed
  // then remove the token and session and redirect to the "/login page "
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    res.clearCookie("token");
    res.send("user logout sucessfully");
  } catch (error) {
    res.status(500).send("internal server Error " + error.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  // validate the userData0
  // store the password in the hash
  // send token to the to user

  try {
    const { firstName, lastName, age, gender, password, email, skills } =
      req.body.formData;
    signupValidation(req.body.formData);

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).send("user already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = {
      firstName,
      lastName,
      age,
      gender,
      email,
      password: hashPassword,
      skills,
    };
    const user = new User(userData);
    const saveUser = await user.save();
    const token = saveUser.getJwt();

    // Set the token in an httpOnly cookie for secure access
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 3600000), // 1 hour
    });
    res
      .status(200)
      .json({ message: "user created successfully", data: saveUser });
  } catch (error) {
    res.status(500).send("error " + error.message);
  }
});

module.exports = authRouter;
