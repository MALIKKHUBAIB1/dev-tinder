const fs = require("fs");
const a = 100;
setImmediate(() => console.log("Immediate"));
Promise.resolve(() => "resolve").then(() => console.log("primisse resolve"));
fs.readFile("./demo.txt", "utf8", (err, data) => {
  console.log("file is read");
  console.log(data, err);
});
setTimeout(() => console.log("time Expires"), 0);
process.nextTick(() => console.log("nextTick"));
function printA() {
  console.log("a=", a);
}
printA();
console.log("end");

// output
// a = 100;
// end
// nextTick
// promiss is resolvedd
// time is expired
//setImmidate
// file is is read
