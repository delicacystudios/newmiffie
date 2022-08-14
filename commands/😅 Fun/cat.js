const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: "cat",
  aliases: [],
  description: 'Получить пикчи с котиками',
  category: "Fun",
  usage: '',
  cooldown: 3,
  permissions: ["SEND_MESSAGES"],
  
  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑` : ``}`
    // // // //
    
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search',
      headers: {
        'api-key': `${client.config.keys.CatKey}`
      }
    }).then(res => {
      const embed = new MessageEmbed()
        .setImage(res.data[0].url)
        .setColor(color)
        .setFooter({ text: `${namefooter} ${message.author.tag}` })
        .setTimestamp()
      message.reply({ embeds: [embed] })

    }).catch(err => 
      message.channel.send({ content: 'An error has occured!' })
    )
  }
}