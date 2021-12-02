const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

// Port Number
const port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//INIT middleware
app.set("view engine", "ejs");
app.use(express.json({ extended: false }));

// Index Route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Define Routes
app.use("/login", require("./routes/auth"));
app.use("/tokauth", require("./routes/tokauth"));
app.use("/booklist", require("./routes/bookList"));
app.use("/movielist", require("./routes/movieList"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
