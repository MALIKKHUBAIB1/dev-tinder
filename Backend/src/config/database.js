const mongoose = require("mongoose");

async function connectToDataBase() {
  await mongoose.connect(
   "mongodb+srv://demo123:malik123@cluster0.xr3ng0w.mongodb.net/devTinder"
  );
}
module.exports = {
  connectToDataBase,
};
