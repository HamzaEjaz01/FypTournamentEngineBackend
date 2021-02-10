const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const itemSchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, required: true },
  itemname: {
    type: String,
    required: [true, "Item name is must"],
    min: 3,
    max: 25,
  },
  condition: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number },
  description: { type: String },
  images: [{ type: Object }],
  sellername: {
    type: String,
    required: [true, "User name is must"],
    min: 3,
    max: 20,
  },
  selleremail: { type: String, required: true },
  sellerphone: { type: String, required: true },
  state: { type: String, required: true },
  location: { type: String, required: true },
});

const validate = function (data) {
  const schema = Joi.object({
    _id: Joi.allow(),
    user_id: Joi.allow(),
    status: Joi.allow().required(),
    itemname: Joi.string().min(3).max(25).required(),
    condition: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.allow(),
    description: Joi.allow(),
    images: Joi.allow(),
    sellername: Joi.string().min(3).max(25).required(),
    selleremail: Joi.string().email().required(),
    sellerphone: Joi.string().max(11).min(11),
    state: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  Item: mongoose.model("Item", itemSchema),
  validate: validate,
};
