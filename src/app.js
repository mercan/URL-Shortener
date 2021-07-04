require("dotenv").config();
const fastify = require("fastify");
const useragent = require("useragent");

// Database connection
//require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-compress"));
  app.register(require("fastify-helmet"));

  app.get("/", (req, res) => {
    return { user_agent: useragent.is(req.headers["user-agent"]) };
  });
  return app;
}

module.exports = build;
