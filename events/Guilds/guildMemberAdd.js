const profileModel = require("../../database/profile");

module.exports = async (client, member) => {
  let profile = await profileModel.create({
    UserID: member.id,
    GuildID: member.guild.id,
    MiCoins: 100,
    Bank: 0
  });
  
  profile.save();
}