const AuthController = require("../controllers/auth.contoller");

const routes = [
  {
    method: "POST",
    url: "/signup/",
    handler: AuthController.signup,
  },
  {
    method: "POST",
    url: "/signIn/",
    handler: AuthController.signIn,
  },
];

module.exports = routes;
