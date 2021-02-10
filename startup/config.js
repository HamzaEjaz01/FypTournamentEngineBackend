const keys = require("../config/keys");
const logger = require("./logging");

module.exports = function () {
  if (!keys.jwtPrivateKey) {
    logger.log({
      level: "error",
      message: "FATAL ERROR: jwtPrivateKey is not defined",
    });
  }
};
