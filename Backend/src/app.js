const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToDataBase } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const routerRequest = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", routerRequest);
app.use("/", userRouter);

connectToDataBase()
  .then(() => {
    console.log("DataBase Connected successfully");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
