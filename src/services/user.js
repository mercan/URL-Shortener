const User = require("../models/User");
const tokenCreate = require("../helpers/tokenCreate");

class UserService {
  async Signup(user) {
    const returnObj = {};

    try {
      var userRecord = await User.create(user);
    } catch (err) {
      return { error: { message: "Email is already in use" } };
    }

    return { ...returnObj, token: tokenCreate(userRecord) };
  }

  async SignIn({ email, password }) {
    const userRecord = await User.findOne(
      { email },
      { _id: 1, full_name: 1, email: 1, password: 1 }
    );

    if (!userRecord) {
      return { statusCode: 400, message: "Email not registered." };
    }

    const isMatch = userRecord.comparePassword(password);

    if (!isMatch) {
      return { statusCode: 400, message: "Password is incorrect." };
    }

    return { statusCode: 200, token: tokenCreate(userRecord) };
  }
}

module.exports = new UserService();
