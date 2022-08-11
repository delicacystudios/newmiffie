const backup = require("discord-backup");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "load-backup",
  description: "Загрузить бэкап",
  aliases: [],
  usage: [],
  category: "Addons",
  cooldown: 3,
  premium: false,
  
  run: async (client, message, args) => {
    backup.load(args[0], message.guild).catch((e) => {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription('Произошла ошибка во время попытки загрузки бэкапа!')
      message.channel.send({ embeds: [embed] })
    })
  }
};
