const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.code(400).send({
      statusCode: 400,
      message: "Token cannot be empty.",
    });
  }

  const bearerToken = token.includes("Bearer") ? token.split("Bearer ")[1] : "";

  jwt.verify(bearerToken, process.env.TOKEN_SECRET_KEY, (err, decode) => {
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
