const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require(".././models/user");

const userRouter = express.Router();
const USER_SAVEDATA = [
  "firstName",
  "lastName",
  "age",
  "skills",
  "gender",
  "photoUrl",
  "about",
];

userRouter.get(
  "/user/requests/recived",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const id = req._id;
      const allConnection = await ConnectionRequest.find({
        toUserId: id,
        status: "interested",
      }).populate("formUserID", USER_SAVEDATA);
      if (!allConnection.length) {
        return res
          .status(400)
          .json({ message: "there is no connection found " });
      }
      res.status(200).json({ data: allConnection });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
userRouter.get("/user/connections", isUserAuthenticated, async (req, res) => {
  try {
    const id = req._id; // loggedin User Id

    const getAllacceptedRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: id,
          status: "accept",
        },
        {
          formUserID: id,
          status: "accept",
        },
      ],
    })

      .populate("formUserID", USER_SAVEDATA)
      .populate("toUserId", USER_SAVEDATA);

    if (!getAllacceptedRequest.length) {
      return res.status(400).json({ message: "conection not found" });
    }
    const data = getAllacceptedRequest.map((req) => {
      if (req.formUserID.toString() === id.toString()) {
        return req.toUserId;
      }
      // Otherwise, return the sender's ID
      return req.formUserID;
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/user/feed", isUserAuthenticated, async (req, res) => {
  try {
    // algorithm
    // user should see all the card except
    // his own card
    // his connection
    // ignored people
    // already send a connection
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const loggedInUserId = req._id;
    const userConnection = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUserId },
        {
          formUserID: loggedInUserId,
        },
      ],
    }).select("formUserID toUserId");
    const hideUserFromFeed = new Set();
    userConnection.forEach((con) => {
      hideUserFromFeed.add(con.formUserID.toString());
      hideUserFromFeed.add(con.toUserId.toString());
    });
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, //hide from the user feed whos made alredy connection to  the user or user send the request to the toher user
        { _id: { $ne: loggedInUserId } }, // self Card
      ],
    })
      .select(USER_SAVEDATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = userRouter;
