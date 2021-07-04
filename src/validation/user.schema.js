const joi = require("@hapi/joi");

const userSignup = joi.object({
  full_name: joi.string().required().trim().min(3).max(100).messages({
    "string.min": `Name should have a minimum length of {#limit}.`,
    "string.max": `Name should have a maximum length of {#limit}.`,
    "string.empty": "Name cannot be an empty field.",
    "any.required": "Name is required",
  }),

  email: joi.string().required().email().trim().lowercase().min(10).max(100).messages({
    "string.min": `Email should have a minimum length of {#limit}.`,
    "string.max": `Email should have a maximum length of {#limit}.`,
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be an empty field.",
    "any.required": "Email is required",
  }),

  password: joi.string().required().min(6).max(100).messages({
    "string.min": `Password should have a minimum length of {#limit}.`,
    "string.max": `Password should have a maximum length of {#limit}.`,
    "string.empty": "Password cannot be an empty field.",
    "any.required": "Password is required",
  }),
});

const userSignIn = joi.object({
  email: joi.string().required().email().trim().lowercase().min(10).max(100).messages({
    "string.min": `Email should have a minimum length of {#limit}.`,
    "string.max": `Email should have a maximum length of {#limit}.`,
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be an empty field.",
    "any.required": "Email is required",
  }),

  password: joi.string().required().min(6).max(100).messages({
    "string.min": `Password should have a minimum length of {#limit}.`,
    "string.max": `Password should have a maximum length of {#limit}.`,
    "string.empty": "Password cannot be an empty field.",
    "any.required": "Password is required",
  }),
});

module.exports = { userSignup, userSignIn };
