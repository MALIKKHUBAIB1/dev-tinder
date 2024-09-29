const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});
app.listen(3000, () => {
  console.log("listening on 3000");
});
