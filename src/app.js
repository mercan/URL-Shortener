require("dotenv").config();
const fastify = require("fastify");
const os = require("os");
// Database connection
//require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-compress"));
  app.register(require("fastify-helmet"));

  app.get("/", (req, res) => {
    return { userInfo: os.userInfo(), headers: req.headers };
  });
  return app;
}

module.exports = build;
