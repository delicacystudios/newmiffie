const { Schema, model } = require("mongoose");
const config = require('../configs/config.js')

const guildSettingSchema = new Schema({
  guildName: {
    type: String
  },

  guildID: {
    type: String,
    required: true
  },

  registeredAt: {
    type: Number,
    default: Date.now()
  },

  prefix: {
    type: String
  },

  language: {
    type: String,
    default: 'en'
  }
})

module.exports = model("Guild Settings", guildSettingSchema);