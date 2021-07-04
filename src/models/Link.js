const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Link = new Schema(
  {
    creator: {
      _id: false,
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },

    link: {
      type: String,
      trim: true,
      required: true,
    },

    link_code: {
      type: String,
      required: true,
      unique: true,
    },

    total_click: {
      type: Number,
      defualt: 0,
    },

    redirect_data: [
      {
        referrer: {
          type: String,
          default: undefined,
        },

        location: {
          country: {
            type: String,
            default: undefined,
          },

          city: {
            type: String,
            default: undefined,
          },
        },

        user_agent: {
          browser: {
            type: String,
            required: true,
          },

          os: {
            type: String,
            required: true,
          },

          device: {
            vendor: {
              type: String,
              default: undefined,
            },

            model: {
              type: String,
              default: undefined,
            },

            type: {
              type: String,
              default: undefined,
            },
          },
        },

        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

Link.index({ link_code: 1 });

module.exports = mongoose.model("link", Link);
