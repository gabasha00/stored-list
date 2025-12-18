var express = require("express");
var router = express.Router();

const Song = require("../models/song");

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.render("index", { songs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

