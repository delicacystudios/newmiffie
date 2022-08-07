const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');
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
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    // // // //
    
    let coin = [
      'Орёл', 
      'Решка'
    ]
    
    const index = random.int(0, coin.length - 1)
    let result = (coin[index])
    
    let embed = new MessageEmbed()
      .setTitle(`Выпал(-а) ${result}`)
      .setColor(color)
    message.reply({ embeds: [embed] })
  }
}