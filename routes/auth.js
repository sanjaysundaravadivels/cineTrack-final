const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const config = require("config");

const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "210919768460-tlrb8mtabkelddo6i8sbmge3lmtdk61d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
// @rute GET api/auth
// @desc Test route
// @access Public
router.get("/", async (req, res) => {
  res.render("login");
});

// @rute POST api/auth
// @desc Authenticate user & get tokenS
// @access Public
router.post("/", async (req, res) => {
  let token = req.body.token;
  let success;
  let msg;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    const name = payload.name;
    const email = payload.email;
    const picture = payload.picture;
    const watchList = [];
    const completedList = [];
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name,
          email,
          picture,
          watchList,
          completedList,
        });

        await user.save();
      }
      let user1 = {
        success: true,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: token,
      };
      res.json(user1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
  verify();
});

module.exports = router;
