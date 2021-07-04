const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Link = new Schema(
  {
    creator: {
      _id: false,
      userID: { type: Schema.Types.ObjectId },
    },

    link_code: { type: String, required: true, unique: true },

    redirect_data: [
      {
        referrer: { type: String },
        country: { type: String },
        os: { type: String },
        device: {
          model: { type: String, default: undefined },
          type: { type: String, default: undefined },
        },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("link", Link);
