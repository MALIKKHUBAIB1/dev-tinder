const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectToDataBase } = require("./config/database");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const routerRequest = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
const PORT = 3000;

// ✅ Correct CORS Middleware Setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // Ensure PATCH is allowed
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests Properly
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  ); // Ensure PATCH is included
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Register Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", routerRequest);
app.use("/", userRouter);

// ✅ Start Server After DB Connection
connectToDataBase()
  .then(() => {
    console.log("✅ Database Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1);
  });
