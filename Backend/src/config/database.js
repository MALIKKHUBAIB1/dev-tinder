const mongoose = require("mongoose");
const { MONGOURL } = require("../../utils/const");

async function connectToDataBase() {
  await mongoose.connect(MONGOURL);
}
module.exports = {
  connectToDataBase,
};
