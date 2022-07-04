const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: 'user',
  aliases: [],
  category: "Utility",
  usage: '<пользователь>',
  description: "Информация о пользователе",

  run: async (client, message, args) => {
    const statuses = {
      online: `Онлайн`,
      idle: `Неактивен`,
      dnd: `Не беспокоить`,
      offline: `Оффлайн`
    }

    let user = message.mentions.members.first() || message.member;

    if (user) {
      const mention = message.member;
      const embed = new MessageEmbed()
        .setColor(config.embeds.color)
        .setThumbnail(message.member.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle(`Информация о ${user.displayName}`)
        .addFields(
          {
            name: '`  彡 Упоминание:  `',
            value: `> <@${user.user.id}>`,
            inline: true
          },
          {
            name: '`  彡 Пинг:  `',
            value: `> ${Math.round(client.ws.ping)}ms`,
            inline: true
          },
          {
            name: '`  彡 Статус:  `',
            value: `> ${statuses[user.presence.status]}`,
            inline: true
          },
          {
            name: '`  彡 Дата входа:  `',
            value: `> \`${mention.joinedAt.toLocaleString()}\``,
            inline: true
          },
          {
            name: '`  彡 Дата создания:  `',
            value: `> \`${mention.user.createdAt.toLocaleString()}\``,
            inline: true
          }
        )
      message.channel.send({ embeds: [embed] })
    }
  }
}