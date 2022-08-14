const { Schema, model } = require("mongoose");

const languages = new Schema({
  GuildID: {
    type: String
  },

  Language: {
    type: String
  }
})

module.exports = model("Server Language", languages);