const profileModel = require("../database/profile");

module.exports = async (client, member) => {
  let profile = await profileModel.create({
    serverID: member.guild.id,
    botID: client.user.id,
    coins: 100,
    bank: 0,
  })
  
  profile.save()
}