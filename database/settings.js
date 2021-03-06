const { Schema, model } = require("mongoose");

const guildSettingSchema = new Schema({
  guildName: {
    type: String
  },
  
  guildID: {
    type: String
  },
  
  prefix: {
    type: String
  }
})

module.exports = model("guild_settings", guildSettingSchema);