const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    full_name: { type: String, maxlength: 60, minlength: 3 },
    email: { type: String, maxlength: 60, minlength: 14 },
    password: { type: String, maxlength: 80, minlength: 7 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
