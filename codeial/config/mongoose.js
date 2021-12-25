const env = require("../config/environment");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://ragas:test1234@cluster1.vhwrm.mongodb.net/${env.db}`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
