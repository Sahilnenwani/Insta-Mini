// inilaize all libary and models
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { USER, PASS, HOST, MAILPORT, SERVICE } = require("../../config/key");

const transporter = nodemailer.createTransport({
  host: HOST,
  port: MAILPORT,
  service: SERVICE,
  auth: {
    user: USER,
    pass: PASS,
  },
});

//make sigiup routes

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic,
        });

        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: USER,
              subject: "signup success",
              html: "<h1>welcome to MiniInstagram</h1>",
            });

            res.json({ messagge: "saved successfully" });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
