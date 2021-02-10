const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Schema = mongoose.Schema;

const userSchema = Schema({
  status: { type: String },
  name: {
    type: String,
    required: [true, "User name is must"],
    min: 3,
    max: 25,
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});

const validate = function (data) {
  const schema = Joi.object({
    _id: Joi.allow(),
    iat: Joi.allow(),
    status: Joi.allow(),
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    phone: Joi.string().max(11).min(11),
    isAdmin: Joi.boolean().required(),
    __v: Joi.allow(),
  });

  return schema.validate(data);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      isAdmin: this.isAdmin,
    },
    keys.jwtPrivateKey
  );

  return token;
};

module.exports = {
  User: mongoose.model("User", userSchema),
  validate: validate,
};
