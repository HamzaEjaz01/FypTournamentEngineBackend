require("express-async-errors");
const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port :", port));
