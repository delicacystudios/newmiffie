const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: 'server',
  aliases: ["serv", "guild", "сервер"],
  category: "Utility",
  description: "Информация о сервере",
  usage: "",

  run: async (client, message, args) => {
    
    //-- Prefix Stuff --//
    const GuildSettings = require("../../database/settings.js");
    let storedSettings = await GuildSettings.findOne({
      guildID: message.guild.id
    });

    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: message.guild.id
      });

      try {
        await newSettings.save()
      } catch (e) {
        console.log(e)
        throw error
      }

      storedSettings = await GuildSettings.findOne({ guildID: message.guild.id })
    }

    let prefix = config.chat.prefix;
    if (storedSettings && storedSettings.prefix) {
      prefix = storedSettings.prefix;
    }
    
    //-- Code --//
    const guild = message.guild;
    let avatar = guild.iconURL({ dynamic: true, size: 4096 }) ? guild.iconURL({ dynamic: true, size: 4096 }) : `https://media.discordapp.net/attachments/984299199967408163/986522852146679808/logo.png`;
    
    if (!args[0]) {
      let verifLevels = {
        NONE: "Нет",
        LOW: "Низкий",
        MEDIUM: "Средний",
        HIGH: "Высокий",
        VERY_HIGH: "Очень высокий",
      };

      const serverembed = new MessageEmbed()
        .setAuthor({ name: `Информация по серверу: ${message.guild.name}` })
        .setThumbnail(avatar)
        .setColor(config.embeds.color)
        .addFields(
          {
            name: `Статистика участников`,
            value: `
            > Всего участников: \`${message.guild.memberCount}\`
            > Людей: \`${message.guild.members.cache.filter((member) => !member.user.bot).size}\`
            > Ботов: \`${message.guild.members.cache.filter((member) => member.user.bot).size}\``,
          },
          {
            name: `Статистика каналов`,
            value: `
            > Всего каналов: \`${message.guild.channels.cache.size}\` 
            > Текстовых каналов: \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\` 
            > Голосовых каналов: \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}\``,
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
        .setFooter({ text: `Аватар сервера: ${prefix}server avatar` })
      message.channel.send({ embeds: [serverembed] })
    }
    
    if (args.join(" ").toLowerCase() === 'avatar') {
      const embed = new MessageEmbed()
        .setColor(config.embeds.color)
        .setImage(avatar)
      message.channel.send({embeds: [embed]})
    }
  }
}