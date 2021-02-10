const mongoose = require("mongoose");
const keys = require("../config/keys");
const logger = require("./logging");

module.exports = function () {
  mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) => {
      logger.log({
        level: "info",
        message: `Connected to mongodb at ${keys.mongoURI}`,
      });
    });
};
