const { MongoClient } = require("mongodb");
const MONGO_URL = require("./constant.js");
if (!MONGO_URL) {
  throw new Error("url not found");
}
const client = new MongoClient(MONGO_URL);

// client.connect();
const DB_NAME = "demo";
async function connectToMongoDb() {
  await client.connect();
  const db = await client.db(DB_NAME);
  const collection = await db.collection("user");

  // const insertResult = await collection.insertMany([
  //   { firstName: "jhon" },
  //   { lastName: "Doe" },
  //   { city: "dehradun" },
  // ]);
  // const findAllCollection = await collection.find({}).toArray();
  // console.log(findAllCollection);
  const findWithName = await collection.find({ firstname: "Jhon " }).toArray();
  console.log(findWithName);
  const countDocumnets = await collection.countDocuments({});
  console.log("count : ", countDocumnets);
  // console.log("Inserted documents =>", insertResult);
  // return "success connect to MongoDB";
}
// export default connectToMongoDb;
module.exports = connectToMongoDb;
