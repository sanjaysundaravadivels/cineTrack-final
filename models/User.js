const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  bookList: [
    {
      isCompleted: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      id: {
        type: String,
      },
      picture: {
        type: String,
      },
      authors: {
        type: [String],
      },
    },
  ],
  movieList: [
    {
      isCompleted: {
        type: Boolean,
      },
      type: {
        type: String,
      },
      title: {
        type: String,
      },
      id: {
        type: String,
      },
      picture: {
        type: String,
      },
      ratings: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
