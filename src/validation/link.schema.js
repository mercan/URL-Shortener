const joi = require("@hapi/joi");

const linkCreate = joi.object({
  link: joi.string().required().trim().min(3).messages({
    "string.min": `Link should have a minimum length of {#limit}.`,
    "string.empty": "Link cannot be an empty field.",
    "any.required": "Link is required",
  }),
});

const linkCode = joi.object({
  link_code: joi.string().required().trim().min(8).max(8).messages({
    "string.max": `Link Code should have a maximum length of {#limit}.`,
    "string.min": `Link Code should have a minimum length of {#limit}.`,
    "string.empty": "Link Code cannot be an empty field.",
    "any.required": "Link Code is required",
  }),
});

module.exports = { linkCreate, linkCode };
