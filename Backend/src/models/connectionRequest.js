const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    formUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accept", "reject", "ignore", "interested"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);
connectionRequestSchema.index({ formUserID: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  const formUserID = new mongoose.Types.ObjectId(connectionRequest.formUserID);
  const toUserId = new mongoose.Types.ObjectId(connectionRequest.toUserId);

  if (formUserID.equals(toUserId)) {
    throw new Error("You cannot send a connection request to yourself.");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = { ConnectionRequest };
