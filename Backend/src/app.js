const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // res.send("<h1>Welcome</h1>");
    console.log("resp1");
    next();
    res.send("user1");
  },
  (req, res) => {
    // res.send("<h1>Welcome</h1>");
    console.log("resp2");
    res.send("user2");
  },
  (req, res) => {
    // res.send("<h1>Welcome</h1>");
    console.log("resp3");
    res.send("user3");
  }
);

app.listen(3000, () => {
  console.log("listening on 3000");
});
