const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const config = require('../../configs/config.js');

module.exports = {
  name: "cat",
  aliases: [],
  description: 'Получить пикчи с котиками',
  category: "Fun",
  usage: '',
  permissions: ["SEND_MESSAGES"],
  
  run: async (client, message, args) => {
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search',
      headers: {
        'api-key': `${config.keys.CatKey}`
      }
    }).then(res => {
      const embed = new MessageEmbed()
        .setImage(res.data[0].url)
        .setColor(config.embeds.color)
        .setFooter({ text: `Запросил(-а) ${message.author.tag}` })
        .setTimestamp()
      message.reply({ embeds: [embed] })

    }).catch(err => 
      message.channel.send({ content: 'Произошла ошибка!' })
    )
  }
}