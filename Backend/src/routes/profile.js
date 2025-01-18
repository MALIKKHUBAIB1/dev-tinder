const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const User = require(".././models/user");
const {
  validDateProfileData,
  validatePasswords,
} = require("../../utils/validation");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

// get profile of user
profileRouter.get("/profile", isUserAuthenticated, async (req, res) => {
  const _id = req._id;
  const userProfile = await User.findById({ _id }).select("-password");
  if (!userProfile) {
    return res.status(404).send("User profile not found.");
  }
  res.status(200).json(userProfile);
});
profileRouter.patch(
  "/profile/forgotpassword",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const passwordValidation = validatePasswords(req.body);

      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }

      const userId = req._id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const isPasswordCorrect = await user.comparePassword(oldPassword);
      if (!isPasswordCorrect) {
        return res.status(403).json({ message: "Old password is incorrect." });
      }
      const genSalt = 10;

      const hashPassword = await bcrypt.hash(newPassword, genSalt);
      user.password = hashPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
profileRouter.patch("/profile/edit", isUserAuthenticated, async (req, res) => {
  try {
    const updateData = req.body;
    const isValidProfile = validDateProfileData(updateData);
    if (!isValidProfile) {
      return res.status(400).json({ message: "update not allowed" });
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
