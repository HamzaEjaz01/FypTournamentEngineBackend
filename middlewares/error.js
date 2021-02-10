const logger = require("../startup/logging");

function error(err, req, res, next) {
  logger.log({
    level: "error",
    message: err.message,
    additional: "properties",
    are: "passed along",
  });
  res.status(500).send(err.message);
}

module.exports = error;
