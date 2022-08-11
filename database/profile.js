const { Schema, model } = require("mongoose");

const profile = new Schema({
  UserID: { 
    type: String,
    Unique: true
  },

  GuildID: {
    type: String
  },
  
  MiCoins: { 
    type: Number, 
    default: 1000
  },
 
  Bank: { 
    type: Number
  }
})

module.exports = model("user profiles", profile);