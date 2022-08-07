const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.js')

module.exports = {
  name: "bugreport",
  description: 'Сообщить о баге',
  usage: "[баг]",
  category: 'Information',
  aliases: ["bug"],
  cooldown: 60,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const premuser = await premSchema.findOne({ User: message.author.id });
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} © Все права защищены`
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    // // // //

    if (!args[0]) {
      const emmma = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Пожалуйста, напишите что-то, прежде чем отправлять сообщение')
      message.channel.send({ embeds: [emmma] })
    } else if (args[0]) {
      const emb = new MessageEmbed()
        .setColor(color)
        .setDescription(`Спасибо за сотрудничество! Мы обязательно рассмотрим ваш репорт`)
        .setFooter({ text: `${namefooter}` })
      message.channel.send({ embeds: [emb] })
      if (premuser) {
        const channel = client.channels.cache.get('986880646041436220')
        const embedprem = new MessageEmbed()
          .setAuthor({ name: `Баг-репорт: ${message.author.tag}` })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
          .setColor(color)
          .setDescription(args.join(" "))
          .setFooter({ text: `${premstatus}` })
          .setTimestamp()
        channel.send({ content: `<@528930032823959562>`, embeds: [embedprem] })
        
      } else {
        const channel = client.channels.cache.get('986880646041436220')
        const embed = new MessageEmbed()
          .setAuthor({ name: `Баг-репорт: ${message.author.tag}` })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
          .setColor(color)
          .setDescription(args.join(" "))
          .setFooter({ text: `${premstatus}` })
          .setTimestamp()
        channel.send({ embeds: [embed] })
      }
    }
  }
}