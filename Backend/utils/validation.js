const validator = require("validator");

const signupValidation = (userData) => {
  const { firstName, lastName, age, gender, password, email } = userData;

  function validationError(err) {
    throw new Error(err);
  }
  // Check for missing fields
  if (![firstName, lastName, age, gender, password, email].every(Boolean)) {
    validationError("All fields are required.");
  }

  // Validate gender
  if (!["male", "female", "others"].includes(gender.toLowerCase())) {
    validationError("Gender must be 'male', 'female', or 'others'.");
  }

  // Validate firstName
  if (firstName.length < 3 || firstName.length > 16) {
    validationError("First name must be between 3 and 16 characters.");
  }

  // Validate lastName
  if (lastName.length < 3 || lastName.length > 16) {
    validationError("Last name must be between 3 and 16 characters.");
  }

  // Validate age
  if (!Number.isInteger(age) || age < 0 || age > 120) {
    validationError("Age must be a valid number between 0 and 120.");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    validationError("Please enter a valid email.");
  }
  // Validate password
  if (!validator.isStrongPassword(password)) {
    validationError(
      "Password must be strong (include uppercase, lowercase, numbers, and symbols"
    );
  }
};
function validDateProfileData(userData) {
  const allowedUpdate = [
    "skills",
    "age",
    "about",
    "photoUrl",
    "firstName",
    "lastName",
  ];
  const isUpdateAllowed = Object.keys(userData).every((userInputKey) => {
    return allowedUpdate.includes(userInputKey); // Explicitly return the result
  });

  return isUpdateAllowed;
}

module.exports = {
  signupValidation,
  validDateProfileData,
};
