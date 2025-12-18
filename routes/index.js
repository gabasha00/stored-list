var express = require("express");
var router = express.Router();

const Song = require("../models/song");

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1});
    res.render("index", { songs });
  } catch (err) {
    next(err);
  }
});

router.post("/item", async (req, res, next) => {
  try {
    const { title, artist } = req.body;
    await Song.create({ title, artist });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.put("/item/:id", async (req, res, next) => {
  try {
    const { title, artist } = req.body;
    await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist },
      { runValidators: true }
    );
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.delete("/item/:id", async (req, res, next) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

