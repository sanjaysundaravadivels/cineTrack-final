const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
router.post("/", auth, async (req, res) => {
  const movieList = req.body;

  let email = req.user.email;
  try {
    let user = await User.findOne({ email });
    let flag = true;

    for (let item in user.movieList) {
      if (movieList.id == user.movieList[item].id) {
        flag = false;
      }
    }
    if (flag) {
      user.movieList.push(movieList);
      let user1 = await User.findOneAndUpdate(
        { email: req.user.email },
        { $set: user },
        { new: true }
      );
    }
    //console.log(user);
    res.json({ success: flag });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    let email = req.user.email;
    let user = await User.findOne({ email });
    let movieList = user.movieList;
    res.json({
      success: true,
      movieList: movieList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    let id = req.params.id;
    id = id.split("-");

    let email = req.user.email;
    let user = await User.findOne({ email });
    if (user.movieList) {
      if (id[1] == "tv") {
        let movie = user.movieList.filter(
          (item) => item.id != id[0] || item.type != "tv"
        );
        user.movieList = movie;
        let user1 = await User.findOneAndUpdate(
          { email: req.user.email },
          { $set: user },
          { new: true }
        );
        res.json({ msg: "item deleted" });
        return;
      }
      let movie = user.movieList.filter(
        (item) => item.id != id[0] || item.type != "movie"
      );

      user.movieList = movie;
      let user1 = await User.findOneAndUpdate(
        { email: req.user.email },
        { $set: user },
        { new: true }
      );
    }

    // res.json(feedback);
    res.json({ msg: "item deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
