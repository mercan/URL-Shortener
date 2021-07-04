const userAgentParser = require("ua-parser-js");

module.exports = (user_agent) => {
  const ua = userAgentParser(user_agent);
  const browser = ua.browser;
  const device = ua.device;
  const os = ua.os;

  return {
    user_agent: {
      browser: `${browser.name} ${browser.version}`,
      os: `${os.name} ${os.version}`,
      device,
    },
  };
};
