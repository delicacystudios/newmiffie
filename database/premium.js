const { Schema, model } = require("mongoose");

const premium = new Schema({
  User: String
});

module.exports = model("premium users", premium);