const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Watchlist = mongoose.model("watchlist", WatchlistSchema);
