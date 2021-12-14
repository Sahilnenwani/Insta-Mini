const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {
  USER,
  PASS,
  HOST,
  MAILPORT,
  SERVICE,
  EMAIL,
} = require("../../config/key");

const transporter = nodemailer.createTransport({
  host: HOST,
  port: MAILPORT,
  service: SERVICE,
  auth: {
    user: USER,
    pass: PASS,
  },
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((user) => {
        transporter.sendMail({
          to: user.email,
          from: USER,
          subject: "password reset",
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});
module.exports = router;
