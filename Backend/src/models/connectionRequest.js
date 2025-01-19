const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    formUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accept", "reject", "ignored", "interested"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = { ConnectionRequest };
