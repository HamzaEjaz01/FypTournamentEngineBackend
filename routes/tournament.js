const express = require("express");
const router = express.Router();
const { Tournament } = require("../models/tournament");
const { validate } = require("../models/tournament");
const { User } = require("../models/user");
const {
  sendEmailToOrganizerUnreg,
  sendOrganizerDeleteEmail,
  sendEmail2,
} = require("../nodemailer/index.js");

router.post("/", async (req, res) => {
  //validate the request

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let tournament = new Tournament({
    organizer: req.body.organizer,
    status: req.body.status,
    tournamentType: req.body.tournamentType,
    name: req.body.name,
    image: req.body.image,
    gameName: req.body.gameName,
    email: req.body.email,
    platform: req.body.platform,
    avenue: req.body.avenue,
    participantsType: req.body.participantsType,
    teams: req.body.teams,
    players: req.body.players,
    isChecked: req.body.isChecked,
    entryfee: req.body.entryfee,
    timezone: req.body.timezone,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    organizeDate: req.body.organizeDate,
    startTime: req.body.startTime,
    prize: req.body.prize,
    description: req.body.description,
    rules: req.body.rules,
    result: req.body.result,
    teamParticipants: req.body.teamParticipants,
    playerParticipants: req.body.playerParticipants,
  });

  const response = await tournament.save();

  res.status(200).send(response);
});

// update tournament
router.put("/:id", async (req, res) => {
  console.log("Hamza");
  //First check that the tournament exists or not
  let tournament = await Tournament.findOne({ _id: req.params.id });
  if (!tournament) return res.status(400).send("Tournament not found");

  //Validate
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update
  tournament.set({
    organizer: req.body.organizer,
    status: req.body.status,
    tournamentType: req.body.tournamentType,
    name: req.body.name,
    image: req.body.image,
    gameName: req.body.gameName,
    email: req.body.email,
    platform: req.body.platform,
    avenue: req.body.avenue,
    participantsType: req.body.participantsType,
    teams: req.body.teams,
    players: req.body.players,
    isChecked: req.body.isChecked,
    entryfee: req.body.entryfee,
    timezone: req.body.timezone,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    organizeDate: req.body.organizeDate,
    startTime: req.body.startTime,
    prize: req.body.prize,
    description: req.body.description,
    rules: req.body.rules,
    result: req.body.result,
    teamParticipants: req.body.teamParticipants,
    playerParticipants: req.body.playerParticipants,
  });

  let response = await tournament.save();
  res.status(200).send(response);
});

// for sending mail for approve/disapprove after updating tournament
router.put("/status/:id", async (req, res) => {
  console.log("status");
  //First check that the tournament exists or not
  let tournament = await Tournament.findOne({ _id: req.params.id });
  if (!tournament) return res.status(400).send("Tournament not found");

  //Validate
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update
  tournament.set({
    organizer: req.body.organizer,
    status: req.body.status,
    tournamentType: req.body.tournamentType,
    name: req.body.name,
    image: req.body.image,
    gameName: req.body.gameName,
    email: req.body.email,
    platform: req.body.platform,
    avenue: req.body.avenue,
    participantsType: req.body.participantsType,
    teams: req.body.teams,
    players: req.body.players,
    isChecked: req.body.isChecked,
    entryfee: req.body.entryfee,
    timezone: req.body.timezone,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    organizeDate: req.body.organizeDate,
    startTime: req.body.startTime,
    prize: req.body.prize,
    description: req.body.description,
    rules: req.body.rules,
    result: req.body.result,
    teamParticipants: req.body.teamParticipants,
    playerParticipants: req.body.playerParticipants,
  });
  let response = await tournament.save();
  res.status(200).send(response);
  //console.log("organizer id before", tournament.organizer);
  let user = await User.findOne({ _id: tournament.organizer });
  //console.log("user;", user);

  sendEmail2(user.email, tournament);
});

//register to tournament
router.put("/register/:id", async (req, res) => {
  //First check that the tournament exists or not
  let tournament = await Tournament.findOne({ _id: req.params.id });
  if (!tournament) return res.status(400).send("Tournament not found");

  //Validate
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // console.log(req.body);
  //Update
  let response = null;
  if (tournament.participantsType === "teams") {
    response = await Tournament.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          teamParticipants:
            req.body.teamParticipants[req.body.teamParticipants.length - 1],
        },
      },
      { new: true }
    );
  } else {
    response = await Tournament.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          playerParticipants:
            req.body.playerParticipants[req.body.playerParticipants.length - 1],
        },
      },
      { new: true }
    );
  }

  res.status(200).send(response);
});

// req for browse
router.get("/", async (req, res) => {
  const tournaments = await Tournament.find({ status: "approved" });
  res.status(200).send(tournaments);
});

// mytournaments
router.get("/mytournaments/:id", async (req, res) => {
  //console.log("iner");
  const tournaments = await Tournament.find({ organizer: req.params.id });
  // console.log(tournaments);
  res.status(200).send(tournaments);
});

// dlt tour and Email sending to participants when org delete tournament delete tournament
router.delete("/mytournaments/:id", async (req, res) => {
  //First check this tournament is exists or not...
  let tournament = await Tournament.findOne({ _id: req.params.id });
  if (tournament.participantsType === "players") {
    let userids = [];
    for (let i = 0; i < tournament.playerParticipants.length; i++) {
      userids.push(tournament.playerParticipants[i].user);
    }
    //console.log(userids.length);

    for (let i = 0; i < userids.length; i++) {
      console.log(i);
      let user = await User.findOne({ _id: userids[i] });
      //console.log(user);
      await sendOrganizerDeleteEmail(user.email, tournament.name);
    }
  }
  if (!tournament) return res.status(400).send("Tournament not found");

  //If all is okay, then remove this tournament
  tournament = await Tournament.findByIdAndRemove(req.params.id);

  res.status(200).send(tournament);
});

// req for mymatches
router.get("/mymatches/:id", async (req, res) => {
  console.log("My matches", req.params.id);
  const tournaments = await Tournament.find();

  let mymatches = [];
  for (let i = 0; i < tournaments.length; i++) {
    for (let j = 0; j < tournaments[i].playerParticipants.length; j++) {
      if (tournaments[i].playerParticipants[j].user == req.params.id) {
        mymatches.push(tournaments[i]);
      }
    }
  }

  for (let i = 0; i < tournaments.length; i++) {
    for (let j = 0; j < tournaments[i].teamParticipants.length; j++) {
      if (tournaments[i].teamParticipants[j].user == req.params.id) {
        mymatches.push(tournaments[i]);
      }
    }
  }

  res.status(200).send(mymatches);
});

// unregister to tournament
router.delete("/mymatches/:t_id/:u_id", async (req, res) => {
  //First check this tournament is exists or not...
  let tournament = await Tournament.findOne({ _id: req.params.t_id });
  if (!tournament) return res.status(400).send("Tournament not found");

  let user = await User.findOne({ _id: req.params.u_id });
  //Update
  let response = null;
  // console.log(req.params.u_id);
  response = await Tournament.findOneAndUpdate(
    {
      _id: req.params.t_id,
    },
    {
      $pull: {
        teamParticipants: { user: req.params.u_id },
        playerParticipants: { user: req.params.u_id },
      },
    },
    { new: true }
  );

  res.status(200).send(response);
  // organizer email console.log(tournament.email);
  // user jo unreg hua console.log(user.name);
  // user jo unreg hua oski mail console.log(user.email);

  sendEmailToOrganizerUnreg(
    tournament.email,
    tournament.name,
    user.name,
    user.email
  );
});

// for feedback
router.put("/feedback/:id", async (req, res) => {
  console.log("Feedback received...");
  // console.log(req.body);
  //Update
  let response = null;

  response = await Tournament.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: { feedback: req.body.feedback },
    },
    { new: true }
  );

  res.status(200).send(response);
});

// admin panel pending tournaments
router.get("/pendingtournaments", async (req, res) => {
  console.log("iner");
  const tournaments = await Tournament.find({ status: "pending" });
  // console.log(tournaments);
  res.status(200).send(tournaments);
});

router.put("/uploadResult/:id", async (req, res) => {
  //First check that the tournament exists or not
  let tournament = await Tournament.findOne({ _id: req.params.id });
  if (!tournament) return res.status(400).send("Tournament not found");

  //Update
  // console.log(req.body)
  tournament.result = req.body.result;

  let response = await tournament.save();
  res.status(200).send(response);
});

module.exports = router;
