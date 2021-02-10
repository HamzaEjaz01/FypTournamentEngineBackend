const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { validate } = require("../models/user");
const { sendEmail, sendEmailBlockUnblock } = require("../nodemailer");

router.post("/", async (req, res) => {
  // console.log(req.body);
  //validate request...
  //if error return with code 400 bad request
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already exist");

  user = await User.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send("Phone already exist");

  user = new User({
    status: req.body.status,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  const response = await user.save();

  res.status(200).send(response);
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  let validPassword = req.body.password === user.password;
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (user.isAdmin !== req.body.isAdmin)
    return res.status(400).send("Invalid email or password");

  if (user.status === "block") {
    return res.status(400).send("Your account is temporary blocked by admin");
  }

  const token = user.generateAuthToken();

  res.status(200).send(token);
});

router.post("/passwordRecovery", async (req, res) => {
  // console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email");

  // console.log(user.password)
  sendEmail(req.body.email, user.password);
  res.status(200).send("Your password has been sent to your email address");
});

router.get("/", async (req, res) => {
  const users = await User.find({ isAdmin: false });
  res.status(200).send(users);
});

// to update user
router.put("/:id", async (req, res) => {
  console.log("hello");
  console.log(req.body);
  //console.log(req.body);
  //First check that the user exists or not
  let user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("User not found");

  //Validate
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Update
  user.set({
    status: req.body.status,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  let response = await user.save();
  res.status(200).send(response);
});

router.put("/status/:id", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("User not found");

  //Validate
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  user.set({
    status: req.body.status,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  let response = await user.save();
  res.status(200).send(response);

  sendEmailBlockUnblock(req.body.email, req.body.status);
});

module.exports = router;
