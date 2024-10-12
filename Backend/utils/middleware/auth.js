function isUserAuthenticated(req, res, next) {
  // const token = "askjdnad+njd,asnds";
  const token = req.query.token;
  const isAuth = token === "xyz";

  if (isAuth) {
    next();
  } else {
    res.status(401).send("user is not authenticated");
  }
}
module.exports = {
  isUserAuthenticated,
};
