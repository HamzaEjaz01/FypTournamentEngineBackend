const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const teamParticipantsSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  teamName: { type: String },
  captainEmail: { type: String, required: true },
  players: [Object],
});

const tournamentSchema = Schema({
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, required: true },
  tournamentType: {
    type: String,
    required: [true, "Tournament tyoe is must"],
  },
  name: {
    type: String,
    required: [true, "Tournament name is must"],
    min: 3,
    max: 35,
  },
  image: { type: Object },
  gameName: {
    type: String,
    required: [true, "Game name is must"],
    min: 3,
    max: 35,
  },
  avenue: { type: String },
  platform: { type: String },
  email: { type: String, required: true },
  participantsType: {
    type: String,
    required: true,
  },
  teams: { type: Number, required: true },
  players: { type: Number, required: true },
  isChecked: {
    type: String,
  },
  entryfee: { type: Number },
  timezone: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  organizeDate: { type: String, required: true },
  startTime: { type: String, required: true },
  prize: { type: Number },
  description: { type: String },
  rules: { type: String },
  result: { type: String },

  teamParticipants: [teamParticipantsSchema],
  playerParticipants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      email: { type: String, required: true },
    },
  ],

  feedback: [
    {
      name: "",
      comment: "",
    },
  ],
});

const validate = function (data) {
  const schema = Joi.object({
    _id: Joi.allow(),
    organizer: Joi.allow(),
    status: Joi.string().required(),
    tournamentType: Joi.string(),
    name: Joi.string().min(3).max(35).required(),
    gameName: Joi.string().min(3).max(35).required(),
    image: Joi.object(),
    email: Joi.string().email().required(),
    platform: Joi.allow(),
    avenue: Joi.allow(),
    participantsType: Joi.string().required(),
    teams: Joi.number().allow(),
    players: Joi.number().required(),
    isChecked: Joi.allow(),
    entryfee: Joi.number(),
    timezone: Joi.string(),
    startDate: Joi.required(),
    endDate: Joi.required(),
    organizeDate: Joi.required(),
    startTime: Joi.required(),
    prize: Joi.number(),
    description: Joi.string(),
    rules: Joi.string(),
    result: Joi.allow(),
    teamParticipants: Joi.allow(),
    playerParticipants: Joi.allow(),
    feedback: Joi.allow(),
    __v: Joi.allow(),
  });

  return schema.validate(data);
};

module.exports = {
  Tournament: mongoose.model("Tournament", tournamentSchema),
  validate: validate,
};
