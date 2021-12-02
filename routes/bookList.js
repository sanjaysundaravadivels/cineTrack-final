const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
router.post("/", auth, async (req, res) => {
  const bookList = req.body;

  let email = req.user.email;
  try {
    let user = await User.findOne({ email });
    let flag = true;
    for (let item in user.bookList) {
      if (bookList.id == user.bookList[item].id) {
        flag = false;
      }
    }
    if (flag) {
      user.bookList.push(bookList);
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
    let bookList = user.bookList;
    res.json({
      success: true,
      bookList: bookList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    // remove item
    const id = req.params.id;

    let email = req.user.email;
    let user = await User.findOne({ email });
    if (user.bookList) {
      let movie = user.bookList.filter((item) => item.id != id);
      user.bookList = movie;
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
