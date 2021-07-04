const LinkController = require("../controllers/link.controller");
const tokenVerifier = require("../../middleware/tokenVerifier");

const routes = [
  {
    method: "GET",
    url: "/link/create/",
    preValidation: tokenVerifier,
    handler: LinkController.create,
  },
  {
    method: "GET",
    url: "/:link_code",
    handler: LinkController.getRedirectLink,
  },
];

module.exports = routes;
