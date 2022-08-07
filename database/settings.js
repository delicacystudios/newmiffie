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
  },

  addons: {
    type: Object,
    default: {
      welcome: {
        enabled: false,
        channel: null,
        message: null,
        image: false,
        embed: false
      },
      
      goodbye: {
        enabled: false,
        channel: null,
        message: null,
        image: false,
        embed: false
      }
    }
  }
})

module.exports = model("Guild Settings", guildSettingSchema);