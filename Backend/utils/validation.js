const validator = require("validator");
const singupValidation = (userData) => {
  const { firstName, lastName, age, gender, password, email } = userData;
  if (![firstName, lastName, age, gender, password, email].every(Boolean)) {
    return res
      .status(404)
      .send("invalid feild please fill the feild with valid values");
  }
  if (!["male", "female", "others"].includes(gender)) {
    return res.status(401).send("invalid gender feild");
  }
  if (firstName < 4 || firstName > 16) {
    throw new Error("please enter a valid first name");
  }
  if (lastName < 4 || lastName > 16) {
    throw new Error("please enter a valid last name");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

module.exports = {
  singupValidation,
};
