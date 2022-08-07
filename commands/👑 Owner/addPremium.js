const { MessageEmbed } = require('discord.js');
const config = require("../../configs/config.js");
const premSchema = require("../../database/premium.js");

module.exports = {
  name: "addPremium",
  description: "Сгенерировать новый премиум код",
  aliases: ['ap'],
  category: "Owner",
  usage: "[пользователь]",
  premium: false,
  
  run: async (client, message, args) => {
    if (message.author.id == config.bot.devID) {
      const member = 
        message.mentions.members.first() || 
        client.users.cache.get(args[0])

      premSchema.findOne({
        User: member.id
      }, async(err, data) => {
        if (data) {
          const dataembed = new MessageEmbed()
            .setColor(config.embeds.error)
            .setDescription(`${member} уже имеет премиум!`)
          message.channel.send({ emebds: [dataembed] })
          
        } else {
          new premSchema({
            User: member.id
          }).save()
          const nodata = new MessageEmbed()
            .setColor(config.embeds.developer)
            .setDescription(`Был выдан премиум - ${member}`)
          message.channel.send({ embeds: [nodata] })
        }
      });

      if (!member) {
        const nomember = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription('Пользователь не найден!')
        message.channel.send({ embeds: [nomember] })
      }
    }
  }
}