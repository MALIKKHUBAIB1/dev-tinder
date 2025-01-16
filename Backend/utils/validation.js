const validator = require("validator");

const signupValidation = (userData) => {
  const { firstName, lastName, age, gender, password, email } = userData;

  const errors = [];

  // Check for missing fields
  if (![firstName, lastName, age, gender, password, email].every(Boolean)) {
    errors.push("All fields are required.");
  }

  // Validate gender
  if (!["male", "female", "others"].includes(gender.toLowerCase())) {
    errors.push("Gender must be 'male', 'female', or 'others'.");
  }

  // Validate firstName
  if (firstName.length < 4 || firstName.length > 16) {
    errors.push("First name must be between 4 and 16 characters.");
  }

  // Validate lastName
  if (lastName.length < 4 || lastName.length > 16) {
    errors.push("Last name must be between 4 and 16 characters.");
  }

  // Validate age
  if (!Number.isInteger(age) || age < 0 || age > 120) {
    errors.push("Age must be a valid number between 0 and 120.");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    errors.push("Please enter a valid email.");
  }

  // Validate password
  if (!validator.isStrongPassword(password)) {
    errors.push(
      "Password must be strong (include uppercase, lowercase, numbers, and symbols)."
    );
  }

  // Return errors if any
  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true };
};

module.exports = {
  signupValidation,
};
