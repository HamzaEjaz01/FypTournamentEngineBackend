const body = require("body-parser");
const cors = require("cors");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(body.json({ limit: "10mb" }));
  app.use(body.urlencoded({ extended: false }));

  app.use("/users", require("../routes/user"));
  app.use("/contact", require("../routes/contact"));
  app.use("/tournaments", require("../routes/tournament"));
  app.use("/items", require("../routes/item"));
  app.use("/payment", require("../routes/payment")); //payment code

  app.use(error);
};
