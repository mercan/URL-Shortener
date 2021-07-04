const jwt = require("jsonwebtoken");

module.exports = ({ _id: id, full_name, email }) =>
  jwt.sign(
    {
      id,
      full_name,
      email,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      algorithm: "HS512",
      expiresIn: "15d", // 15 gün.
    }
  );
