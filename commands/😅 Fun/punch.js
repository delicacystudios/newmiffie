const { MessageEmbed } = require("discord.js");
const { Random } = require("something-random-on-discord");
const language = require('../../references/language');

module.exports = {
  name: "punch",
  aliases: [],
  description: 'Очень сильно ударить',
  category: "Fun",
  usage: '[пользователь]',
  cooldown: 3,
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    const { guild } = message;
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    // // // //
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = await Random.getAnimeImgURL("punch");
    
    const embed = new MessageEmbed()
      .setImage(data)
      .setColor(color)
      .setFooter({ text: `${message.author.username} ${language(guild, 'PUNCH')} ${target.user.username}` })
      .setTimestamp()
    message.channel.send({ embeds: [embed] });
  }
};