const { Schema, model } = require("mongoose");

const pg = new Schema({
  GuildID: String,
  Expire: Number,
  Permanent: Boolean
})

module.exports = model("premium guilds", pg);