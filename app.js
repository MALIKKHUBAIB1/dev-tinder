// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>port 80</h1>");
// });
// app.listen(3000);
const http = require("http");
const connectToMongoDb = require("./connection/connect_mongo.js");

connectToMongoDb()
  .then((res) => {
    console.log(res);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const server = http.createServer((req, res) => {
  const body = "Hellow world";
  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain",
  });
  if (req.url === "/secret") {
    res.end("my Secret Data");
  } else {
    res.end(body);
  }
});

server.listen(3000);
