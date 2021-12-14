const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requiredLogin = require("../../middleware/requireLogin");
const User = mongoose.model("User");

router.post("/search-users", (req, res) => {
  let userpattern = new RegExp("^" + req.body.query);
  // let userpattern = new RegExp(`^${req.body.query}`)
  User.find({ email: { $regex: userpattern } })
    .select("_id email")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
