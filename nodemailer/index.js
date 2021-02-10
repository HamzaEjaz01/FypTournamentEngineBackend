"use strict";
const nodemailer = require("nodemailer");

module.exports = {
  //Forgot poassword
  sendEmail: async function (email, password) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Tournament Engine Password Recovery", // Subject line
      text: "Your password is: " + password, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  },

  // block unblock email
  sendEmailBlockUnblock: async function (email, status) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Tournament Engine Account Status", // Subject line
      text: "Your Tournament Engine Account is " + status + " by Admin ", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  },

  sendEmail2: async function (email, tournament) {
    //send email to organizer =if approved and disapproved button in clicked
    //console.log(tournament.name)
    //console.log(tournament.status)
    //approved dissapproved
    //console.log(email)
    //should tournament organizer email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Tournament Status", // Subject line
      // text: "Your  organized Tournament has been :" + status, // plain text body
      html: `
        <h3>Tournament Name :${tournament.name}</h3>
        <h3>Message</h3>
        <pre>Your Tournament organized request has been ${tournament.status} by Admin</pre>
        `,
    });
    //console.log("Message sent: %s", info.messageId);
  },

  // send email when organizer delete tournament
  sendOrganizerDeleteEmail: async function (email, tournamentName) {
    //console.log(tournamentName);
    //console.log(email)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: email, // list of receivers
      subject: " Tournament Deleted", // Subject line
      html: `
        <h3>Tournament Name :${tournamentName}</h3>
        <h3>Message</h3>
        <pre>It is Informed you that your organizer deleted the tournament in which you are registered</pre>
        `,
    });
    console.log("Message sent: sendOrganizerDeleteEmail");
  },
  // send email to organizer when user unreg
  sendEmailToOrganizerUnreg: async function (
    organizerEmail,
    tournamentName,
    userName,
    userEmail
  ) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: organizerEmail, // list of receivers
      subject: " User Unregistered from Your Tournament ", // Subject line
      html: `
        <h3>Tournament Name :${tournamentName}</h3>
        <h3>Message</h3>
        <pre>It is Informed you that User: ${userName} having Email: ${userEmail} has been unregistered from your Tournament : ${tournamentName}
         </pre>
        `,
    });
  },

  // contact email
  sendContactEmail: async function (email, querydata) {
    //console.log(querydata.email);
    //console.log(querydata.description);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tournamentengine@gmail.com", // generated ethereal user
        pass: "sp17bse029", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "tournamentengine@gmail.com", // sender address
      to: email, // list of receivers
      subject: "User Query", // Subject line
      html: `
        <h3>Sender Email :${querydata.email}</h3>
        <h3>Sender Query</h3>
        <p>${querydata.description}</p>
        `,
    });
    console.log("contact emailsent: %s");
  },
};
