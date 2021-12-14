const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../../middleware/requireLogin");
const User = mongoose.model("User");

router.put("/updatepic", requiredLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "pic cannot post" });
      }
      res.json(result);
    }
  );
});

module.exports = router;
