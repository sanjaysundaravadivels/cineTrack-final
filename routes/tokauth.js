const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "210919768460-tlrb8mtabkelddo6i8sbmge3lmtdk61d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
router.post("/", async (req, res) => {
  let token = req.body.token;

  async function verify() {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      const name = payload.name;
      const email = payload.email;
      const picture = payload.picture;
      let user1 = {
        success: true,
        name: name,
        email: email,
        picture: picture,
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
router.get("/", auth, async (req, res) => {
  res.send("Hello");
});
module.exports = router;

// const express = require("express");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   let token = req.body.token;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//     });
//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false });
//   }
// });
