const express = require("express");
const { isUserAuthenticated } = require("../../utils/middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const mongoose = require("mongoose");
const User = require("../models/user");
const routerRequest = express.Router();

routerRequest.post(
  "/request/send/:status/:toUserId",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const formUserID = req._id;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignore"];
      const isStatusValid = allowedStatus.includes(status);

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

      const loggedInUser = await User.findById(formUserID);
      if (!loggedInUser) {
        return res.status(404).json({ message: "Logged in user not found." });
      }

      const connectionUser = await User.findById(toUserId);
      if (!connectionUser) {
        return res.status(404).json({ message: "Connection user not found." });
      }

      await connectionRequest.save();
      res.json({
        message: `${loggedInUser.firstName} has sent a connection request to ${connectionUser.firstName} with status: ${status}`,
      });
    } catch (dbError) {
      return res
        .status(500)
        .json({ message: "Database query failed: " + dbError.message });
    }
  }
);
routerRequest.post(
  "/request/review/:status/:requestId",
  isUserAuthenticated,
  async (req, res) => {
    try {
      //       Check if the user is logged in (already done with isUserAuthenticated).
      // Find the logged-in user by their ID (already done).
      // Destructure the status and requestId from the route parameters.
      // Accept or reject the review request based on the status.
      // Store the result in the database.
      // Handle edge cases (such as invalid status, missing request ID, etc.).

      const id = req._id;
      const { status, requestId } = req.params;

      console.log("loggedIn", id);
      console.log("requestUser", requestId);

      if (!status || !requestId) {
        return res.status(400).json({ message: "Invalid parameters" });
      }

      const loggedInUser = await User.findById(id);

      if (!loggedInUser) {
        res.status(401).json({ message: "user not logged In " });
      }
      const allowedChange = ["accept", "reject"];
      if (!allowedChange.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            formUserID: new mongoose.Types.ObjectId(id),
            toUserId: new mongoose.Types.ObjectId(requestId),
          },
          {
            formUserID: new mongoose.Types.ObjectId(requestId),
            toUserId: new mongoose.Types.ObjectId(id),
          },
        ],
      });

      console.log("Found Connection Request:", connectionRequest);

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      connectionRequest.save();
      res.status(200).json({
        message: "succesfully made connection with the status of " + status,
      });
    } catch (error) {
      res.status(500).json({ message: `${error.message}` });
    }
  }
);

module.exports = routerRequest;
