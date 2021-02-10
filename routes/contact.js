const express = require("express");
const router = express.Router();
const { Contact } = require("../models/contact");
const { sendContactEmail } = require("../nodemailer/index.js");

router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    let contact = new Contact({
      email: req.body.email,
      name: req.body.name,
      description: req.body.description,
    });

    await contact.save();
    res.status(200).send("Your query has been sent to the Admin");
    sendContactEmail("tournamentengine@gmail.com", req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
