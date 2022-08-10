const Schema = require('../../database/autorole');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'disable-autorole',
  aliases: ["dar", "da"],
  category: "Addons",
  description: "Включить автороль",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    Schema.findOne({
      GuildID: message.guild.id
    }, async (err, data) => {
       if (err) throw err;

      if (!data) {
        const embed = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Автороль ещё не была включена для этого сервера!')
          .setFooter({ text: `Miffie Addons` })
          .setTimestamp()
        message.channel.send({ embeds: [embed] })
        
      } else {
        const ra = await Schema.findOne({
          GuildID: message.guild.id
        })

        ra.delete();
        const embed2 = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Автороль была успешно выключена')
          .setFooter({ text: `Miffie Addons` })
          .setTimestamp()
        message.channel.send({ embeds: [embed2] })
      }
    })
  }
}