const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const mongoose = require("mongoose");
const routerRequest = express.Router();

routerRequest.post(
  "/request/send/:status/:toUserId",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const formUserID = req._id;
      const status = req.params.status;

      const AllowedStatus = ["interested", "ignore"];
      const isStatusValid = AllowedStatus.includes(status);
      if (toUserId === formUserID) {
        return res
          .status(400)
          .json({
            message: "You cannot send a connection request to yourself.",
          });
      }
      if (!isStatusValid) {
        return res
          .status(401)
          .json({ message: "please enter valid status :" + status });
      }

      // Validate toUserId
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid toUserId." });
      }
      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { formUserID, toUserId },
          { formUserID: toUserId, toUserId: formUserID },
        ],
      });
      if (existingConnection) {
        return res
          .status(400)
          .json({ message: "A connection request already exists." });
      }
      
      const connectionRequest = new ConnectionRequest({
        formUserID,
        toUserId,
        status,
      });

      if (!connectionRequest) {
        throw new Error("can not find the user please login again ");
      }
      const data = await connectionRequest.save();
      res.json({
        message: "connetion made succesfully with the " + data,
      });
    } catch (dbError) {
      return res
        .status(500)
        .json({ message: "Database query failed: " + dbError.message });
    }
  }
);

module.exports = routerRequest;
