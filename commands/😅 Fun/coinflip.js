const { MessageEmbed } = require('discord.js');
const language = require('../../references/language')
const random = require('random');

module.exports = {
  name: "coinflip",
  aliases: [],
  description: 'Получите ответ на любой вопрос',
  category: "Fun",
  usage: '[вопрос]',
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
    
    let coin = [
      `${language(guild, 'CF_HEAD')}`, 
      `${language(guild, 'CF_TAIL')}`
    ]
    
    const index = random.int(0, coin.length - 1)
    let result = (coin[index])
    
    let embed = new MessageEmbed()
      .setTitle(`${language(guild, 'CF_ANS')} ${result}`)
      .setColor(color)
    message.reply({ embeds: [embed] })
  }
}