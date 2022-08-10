const { MessageEmbed } = require('discord.js');
const premSchema = require("../../database/premium.js");

module.exports = {
  name: "deletePremium",
  description: "Сгенерировать новый премиум код",
  aliases: ['dp'],
  category: "Owner",
  usage: "[пользователь]",
  premium: false,
  
  run: async (client, message, args) => {
    if (message.author.id == client.config.bot.devID) {
      const member = 
        message.mentions.members.first() || 
        client.users.cache.get(args[0])

      premSchema.findOne({
        User: member.id
      }, async(err, data) => {
        if (!data) {
          const nodata = new MessageEmbed()
            .setColor(client.config.embeds.error)
            .setDescription(`${member} не имеет премиума!`)
          message.channel.send({ embeds: [nodata] })
        } else if (data) {
          data.delete();

          const dataembed = new MessageEmbed()
            .setColor(client.config.embeds.developer)
            .setDescription(`Был удалён премиум - ${member}`)
          message.channel.send({ embeds: [dataembed] })
        }
      });

      if (!member) {
        const nomember = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Пользователь не найден!')
        message.channel.send({ embeds: [nomember] })
      }
    }
  }
}