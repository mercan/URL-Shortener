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
    const user_agent = req.headers["user-agent"];
    const agent = useragent.parse(user_agent);
    return {
      agent: agent.toString(),
      os: agent.os.toJSON(),
      device: agent.device.toJSON(),
    };
  });
  return app;
}

module.exports = build;
