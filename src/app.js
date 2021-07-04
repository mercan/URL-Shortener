require("dotenv").config();
const fastify = require("fastify");
const userAgentParser = require("ua-parser-js");

// Database connection
//require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-compress"));
  app.register(require("fastify-helmet"));

  app.get("/", (req, res) => {
    const user_agent = req.headers["user-agent"];
    const ua = userAgentParser(user_agent);

    const browser = ua.browser;
    const device = ua.device;
    const os = ua.os;

    return {
      browser: `${browser.name} ${browser.version}`,
      device: device,
      os: `${os.name} ${os.version}`,
    };
  });
  return app;
}

module.exports = build;
