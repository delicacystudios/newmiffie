const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const profile = new Schema({
  server: { 
    type: reqString
  },
  
  botID: { 
    type: reqString
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