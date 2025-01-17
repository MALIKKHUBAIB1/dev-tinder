const { jwtSecretKey } = require("../const");
const jwt = require("jsonwebtoken");
async function isUserAuthenticated(req, res, next) {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res
        .status(401)
        .send("Unauthorized: Access denied due to missing token.");
    }
    const { _id } = await jwt.verify(token, jwtSecretKey);
    if (!_id) {
      return res.status(401).send("Unauthorized: Invalid token.");
    }
    req._id = _id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Unauthorized: Invalid token.");
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Unauthorized: Token has expired.");
    }
  }
}
module.exports = {
  isUserAuthenticated,
};
