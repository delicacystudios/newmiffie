const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');
const profileModel = require('../../database/profile')

module.exports = {
  name: "server-balance",
  aliases: ["bal", "bl"],
  permissions: [],
  description: "Check the user balance",
  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });

    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} © Все права защищены`
    // // // //

    const profileData = await profileModel.findOne({
      serverID: message.guild.id,
      botID: client.user.id,
    }, async (data, error) => {
      const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`Your wallet bal is ${data.coins}, you banks bal is ${data.bank}`)
      message.channel.send({ embeds: [embed] })
    })
  }
}