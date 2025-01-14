const mongoose = require("mongoose");
const { MONGOURL } = require("../../utils/const");
console.log(MONGOURL);

async function connectToDataBase() {
  await mongoose.connect(MONGOURL);
}
module.exports = {
  connectToDataBase,
};
