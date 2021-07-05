const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.code(403).send({
      code: 403,
      message: "No token provided!",
    });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  try {
    const [decode] = [jwt.verify(bearerToken, process.env.TOKEN_SECRET_KEY)];
    req.user = decode;
    next();
  } catch (err) {
    return res.code(401).send({
      code: 401,
      message: "Unauthorized!",
    });
  }
};
