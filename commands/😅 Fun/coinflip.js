const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');
const random = require('random');

module.exports = {
  name: "coinflip",
  aliases: [],
  description: 'Получите ответ на любой вопрос',
  category: "Fun",
  usage: '[вопрос]',
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    let coin = [
      'Орёл', 
      'Решка'
    ]
    
    const index = random.int(0, coin.length - 1)
    let result = (coin[index])
    
    let embed = new MessageEmbed()
      .setTitle(`Выпал(-а) ${result}`)
      .setColor(config.embeds.color)
    message.reply({ embeds: [embed] })
  }
}