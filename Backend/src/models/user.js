const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 16,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 16,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (validator.isEmail(value)) {
          throw new Error(" email id is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if gender is one of the allowed values
          return ["male", "female", "others"].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid gender. Allowed values are 'male', 'female', or 'others'.`,
      },
      required: [true, "Gender is required"],
      default: "others",
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "this is about user bio ",
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
