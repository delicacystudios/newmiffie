const { Schema, model } = require("mongoose");

const blacklist = new Schema({
  Server: String
});

module.exports = model("black list servers", blacklist);