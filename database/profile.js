const { Schema, model } = require("mongoose");

const profile = new Schema({
  UserID: { 
    type: String,
  },
  
  coins: { 
    type: Number, 
    default: 0 
  },
 
  bank: { 
    type: Number 
  }
})

module.exports = model("user profiles", profile);