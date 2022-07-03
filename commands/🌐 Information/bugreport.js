const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.js')

module.exports = {
  name: "bugreport",
  description: 'Сообщить о баге',
  usage: "[баг]",
  category: 'Information',
  aliases: ["bug"],

  run: async (client, message, args) => {
    if (!args[0]) {
      const emmma = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Пожалуйста, напишите что-то, прежде чем отправлять сообщение')
      message.channel.send({ embeds: [emmma] })
    } else if (args[0]) {
      const emb = new MessageEmbed()
        .setColor(config.embeds.color)
        .setDescription(`Спасибо за сотрудничество! Мы обязательно рассмотрим ваш репорт`)
      message.channel.send({ embeds: [emb] })

      const channel = client.channels.cache.get('986880646041436220')
      const embed = new MessageEmbed()
        .setAuthor({ name: `Bug report by ${message.author.tag}` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(config.embeds.color)
        .setDescription(args.join(" "))
        .setTimestamp()
      channel.send({ embeds: [embed] })
    }
  }
}