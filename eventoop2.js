const fs = require("fs");

setImmediate(() => console.log("Immediate1"));
setTimeout(() => console.log("timer expired 1"), 0);
Promise.resolve("Promis").then(() => console.log("Promis"));

fs.readFile("./demo.txt", "utf8", (err, data) => {
  setTimeout(() => {
    console.log("timer 2 expired");
  }, 0);
  process.nextTick(() => console.log("nexTick2"));
  setImmediate(() => console.log("immediate 2"));
  console.log("file is read", data);
});
setTimeout(() => {
  process.nextTick(() => console.log("nexTick1"));
}, 2000);
console.log("end");

// output
// end
// nextTick1
// Promis
// timer is expired1
// immidiate1
// file is read
// nextTick2
// timer2 is expired
// immidiate2
