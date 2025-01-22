const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");

const userRouter = express.Router();
const USER_SAVEDATA = [
  "firstName",
  "lastName",
  "age",
  "skills",
  "gender",
  "photoUrl",
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
module.exports = userRouter;
