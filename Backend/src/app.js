const express = require("express");
const { isUserAuthenticated } = require("../utils/middleware/auth");
const app = express();

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("resp1");
//     next();
//     // res.send("user1");
//   },
//   (req, res) => {
//     console.log("resp2");
//     res.send("user2");
//   },
//   (req, res) => {
//     console.log("resp3");
//     res.send("user3");
//   }
// );

// To parse URL-encoded bodies (form submissions):

app.use("/admin", isUserAuthenticated);

app.get("/admin/getAlldata", (req, res, next) => {
  console.log("resp2");
  res.send("send all user Data");
  // next();
});

app.get("/admin/delete", (req, res, next) => {
  console.log("resp1");
  res.send("delte user");
  // next();
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
