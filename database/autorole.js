const { Schema, model } = require("mongoose");

const autorole = new Schema({
  ServerID: String,
  Role: String
});

module.exports = model("autorole", autorole);