const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const profile = new Schema({
  guildId: {
    type: reqString
  }, 
  userId: {
    type: reqString
  },
    
  xp: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  }
})

module.exports = model("user profiles", profile);