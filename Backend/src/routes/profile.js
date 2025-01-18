const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const User = require(".././models/user");
const { validDateProfileData } = require("../../utils/validation");

const profileRouter = express.Router();

// get profile of user
profileRouter.get("/profile", isUserAuthenticated, async (req, res) => {
  const _id = req._id;
  console.log(_id);
  const userProfile = await User.findById({ _id }).select("-password");
  if (!userProfile) {
    return res.status(404).send("User profile not found.");
  }
  res.status(200).json(userProfile);
});

profileRouter.patch("/profile/edit", isUserAuthenticated, async (req, res) => {
  try {
    const updateData = req.body;
    const isValidProfile = validDateProfileData(updateData);
    if (!isValidProfile) {
      return res.status(400).send("update not allowed");
    }

    const id = req._id;
    if (!id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const user = await User.findById(id);

    // Update fields from `updateData`
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] != null && updateData[key] !== "") {
        user[key] = updateData[key];
      }
    });
    
    await user.save();
    res
      .status(200)
      .send(
        `${user.firstName} ${user.lastName} your profile is updated successfuly`
      );
  } catch (error) {
    res.status(500).send(err.message);
  }
});
module.exports = profileRouter;
