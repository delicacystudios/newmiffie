const { Schema, model } = require("mongoose");

const commands = new Schema({
  GuildID: {
    type: String
  },

  Commands: {
    type: Array
  }
})

module.exports = model("Commands Toggler", commands);