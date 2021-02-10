const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "TOURNAMENT ENGINE" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.Console({
      level: "debug",
      colorize: true,
      timestamp: true,
    }),
    new transports.File({
      filename: "quick-start-error.log",
      level: "error",
      colorize: true,
      handleExceptions: true,
    }),
    new transports.File({
      filename: "quick-start-error-combined.log",
      level: "info",
      colorize: true,
    }),
  ],
  exitOnError: false,
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
