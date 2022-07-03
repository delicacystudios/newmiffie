const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const config = require('../../configs/config.js');
const emojies = require('../../configs/emoji.js');
const info = emojies.categories.info;
const utile = emojies.categories.util

module.exports = {
  name: "help",
  description: "Команды и возможности ботабота",
  usage: "",
  category: "Information",

  run: async (client, message, args) => {
    const GuildSettings = require("../../database/settings.js");
    let storedSettings = await GuildSettings.findOne({
      guildID: message.guild.id,
    });

    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: message.guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await GuildSettings.findOne({ guildID: message.guild.id });
    };

    let prefix = config.chat.prefix;
    if (storedSettings && storedSettings.prefix) {
      prefix = storedSettings.prefix;
    }

    const Info = message.client.commands.filter(x => x.category == 'Information')
      .map((x) =>
        `\`${prefix}` + x.name + ` ` + x.usage + `\` — ` + x.description + ``).join('\n');

    const Util = message.client.commands.filter(x => x.category == 'Utility')
      .map((x) =>
        `\`${prefix}` + x.name + ` ` + x.usage + `\` — ` + x.description + ``).join('\n');

    const Mod = message.client.commands.filter(x => x.category == 'Moderation')
      .map((x) =>
        `<:beta:945072686244167701> \`${prefix}` + x.name + ` ` + x.usage + `\` — ` + x.description + ``).join('\n');

    if (!args[0]) {
      const intro = new MessageEmbed()
        .setAuthor({ name: `♡ Помощь по командам бота Miffie ♡` })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(config.embeds.color)
        .setDescription(`Чтобы получить справку по категориям команд бота используйте меню, которое есть под сообщением.

\`< >\` — Необязательные аргументы.
\`[ ]\` — Обязательные аргументы.`)

      const intro2 = new MessageEmbed()
        .setColor(config.embeds.color)
        .addFields(
          {
            name: `${info} ・ Информация`,
            value: `➥  \`${prefix}help info\``,
            inline: true
          },
          {
            name: `${utile} ・ Утилиты`,
            value: `➥  \`${prefix}help util\``,
            inline: true
          },
          {
            name: `👮 ・ Модерация`,
            value: `➥  \`${prefix}help mod\``,
            inline: true
          }
        )
        .setImage('https://media.discordapp.net/attachments/986880646041436220/987186785895477318/PicsArt_06-16-08.47.34.png')
        .setFooter({ text: `${client.user.username} © Все права защищены` })


      message.reply({ embeds: [intro, intro2], components: [] })
    }

    if (args.join(" ").toLowerCase() === 'info') {
      const general = new MessageEmbed()
        .setAuthor({ name: `♡ Категория: Информация ♡`, iconURL: client.user.displayAvatarURL() })
        .setColor(config.embeds.color)
        .setDescription(Info)
      message.channel.send({ embeds: [general] })
    }

    if (args.join(" ").toLowerCase() === 'util') {
      const util = new MessageEmbed()
        .setAuthor({ name: `♡ Категория: Утилиты ♡`, iconURL: client.user.displayAvatarURL() })
        .setColor(config.embeds.color)
        .setDescription(Util)
      message.channel.send({ embeds: [util] })
    }

    if (args.join(" ").toLowerCase() === 'mod') {
      const mod = new MessageEmbed()
        .setAuthor({ name: `♡ Категория: Модерация ♡`, iconURL: client.user.displayAvatarURL() })
        .setColor(config.embeds.color)
        .setDescription(Mod)
      message.channel.send({ embeds: [mod] })
    }
  }
}