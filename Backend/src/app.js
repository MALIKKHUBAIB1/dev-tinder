const express = require("express");

const app = express();
//order of the routes us important
app.post("/post", (req, res) => {
  // console.log(req.body);
  console.log("data is sucessful saved in database");
  res.send("sldkjkasd;sad dmaskndlksandlaksndkasndsandksandsadksadas");
});
app.get("/main", (req, res) => {
  res.json([
    { title: "jhon", age: 31 },
    { title: "Doe", age: 1 },
  ]);
});

app.use("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
