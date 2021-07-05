const LinkController = require("../controllers/link.controller");
const tokenVerifier = require("../../middleware/tokenVerifier");

const routes = [
  {
    method: "GET",
    url: "/l/create/",
    preValidation: tokenVerifier,
    handler: LinkController.create,
  },
  {
    method: "GET",
    url: "/:link_code",
    handler: LinkController.getRedirectLink,
  },
  {
    method: "DELETE",
    url: "/l/remove/:link_code",
    preValidation: tokenVerifier,
    handler: LinkController.remove,
  },
  {
    method: "GET",
    url: "/l/statistic/:link_code",
    preValidation: tokenVerifier,
    handler: LinkController.getStatistic,
  },
];

module.exports = routes;
