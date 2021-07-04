const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"].split("Bearer ")[1];

  if (!token) {
    return res.code(400).send({
      statusCode: 400,
      message: "Token cannot be empty.",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) => {
    if (err) {
      return res.code(401).send({
        statusCode: 401,
        message: "Token is invalid or expired",
      });
    }

    req.token = token;
    req.user = decode;
    next();
  });
};
