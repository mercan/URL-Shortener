const got = require("got");
// User Validation
const { userSignup, userSignIn } = require("../../validation/user.schema");
// User Service
const UserService = require("../../services/user");
const getUserAgent = require("../../utils/getUserAgent");

const signup = async (req, res) => {
  const validation = userSignup.validate(req.body);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const apiURL = `http://ip-api.com/json/95.5.230.236?fields=status,country,city`; // İP ADRESİ EKLEMEYİ UNUTMA REQ.IP
  const body = await got(apiURL).json();
  const location = body.status === "success" ? { country: body.country, city: body.city } : {};

  const user_agent = req.headers["user-agent"];
  const userDTO = { ...validation.value, location, ...getUserAgent(user_agent) };
  const { error, token } = await UserService.Signup(userDTO, req.ip);

  if (error) {
    return res.code(400).send({
      statusCode: 400,
      message: error.message,
    });
  }

  return res.code(200).send({ statusCode: 200, token });
};

const signIn = async (req, res) => {
  const validation = userSignIn.validate(req.body);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const userDTO = validation.value;
  const { statusCode, message, token } = await UserService.SignIn(userDTO);

  if (statusCode !== 200) {
    return res.code(statusCode).send({ statusCode, message });
  }

  return res.code(statusCode).send({ statusCode, token });
};

module.exports = { signup, signIn };
