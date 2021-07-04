const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 3,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 100,
      minlength: 10,
    },

    password: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 6,
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

    created_links: [
      {
        _id: false,
        URL: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

User.methods.comparePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

User.index({ email: 1 });

module.exports = mongoose.model("user", User);
