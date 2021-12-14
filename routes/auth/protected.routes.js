const express = require("express");
const router = express.Router();
const requireLogin = require("../../middleware/requireLogin");

//check user login aur not with the help of token
router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

module.exports = router;
