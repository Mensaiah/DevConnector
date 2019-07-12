const mongoose = require("mongoose"),
  config = require("config"),
  db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.mmessage);
  }
};

module.exports = connectDB;
