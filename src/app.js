require("dotenv").config();
const fastify = require("fastify");

//Database connection
require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-formbody"));
  app.register(require("fastify-compress"));
  app.register(require("fastify-helmet"));

  // Auth Routes
  const authRoutes = require("./api/routes/auth");
  authRoutes.forEach((route) => app.route(route));

  // Link routes
  const linkRoutes = require("./api/routes/link");
  linkRoutes.forEach((route) => app.route(route));

  return app;
}

module.exports = build;
