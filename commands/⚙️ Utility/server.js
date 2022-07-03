const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: 'server',
  aliases: ["serv", "guild", "сервер"],
  category: "Utility",
  description: "Информация о сервере",
  usage: "",

  run: async (client, message, args) => {
    if (!args[0]) {
      let verifLevels = {
        NONE: "Нет",
        LOW: "Низкий",
        MEDIUM: "Средний",
        HIGH: "Высокий",
        VERY_HIGH: "Очень высокий",
      };

      const serverembed = new MessageEmbed()
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor(config.embeds.color)
        .addFields(
          {
            name: `Статистика участников`,
            value: `
            > Всего участников: \`${message.guild.memberCount}\`
            > Людей: \`${message.guild.members.cache.filter((member) => !member.user.bot).size}\`
            > Ботов: \`${message.guild.members.cache.filter((member) => member.user.bot).size}\``,
            inline: true
          },
          {
            name: `Статистика каналов`,
            value: `
            > Всего каналов: \`${message.guild.channels.cache.size}\` 
            > Текстовых каналов: \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\` 
            > Голосовых каналов: \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}\``,
            inline: true
          },
          {
            name: `Дополнительная информация`,
            value: `
            > Дата входа: \`${message.member.joinedAt.toLocaleString()}\` 
            > Дата создания: \`${message.guild.createdAt.toLocaleString()}\`
            > Уровень верификации: \`${verifLevels[message.guild.verificationLevel]}\`
            > Создатель: <@${message.guild.ownerId}>`
          }
        )
        .setFooter({ text: `Сервер: ${message.guild.name}` })
      message.channel.send({ embeds: [serverembed] })
    }
  }
}