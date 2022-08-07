const { MessageEmbed } = require('discord.js');
const config = require("../../configs/config.js");

module.exports = {
  name: "menu",
  description: "Меню разработчика",
  aliases: [''],
  category: "Owner",
  usage: "",
  premium: false,

  run: async (client, message, args) => {
    if (message.author.id === config.bot.devID) {
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

      const Info = message.client.commands.filter(x => x.category == 'Owner')
        .map((x) =>
          `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

      const developer = config.bot.devID;

      const general = new MessageEmbed()
        .setAuthor({ name: `♡ Меню Разработчика ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
        .setColor(config.embeds.developer)
        .setDescription(Info)
        .setFooter({ text: `ID: ${developer}` })
        .setTimestamp()
      message.channel.send({ embeds: [general] })

    } else {
      const gen = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription(`Извините, вы не можете получить доступ к данной команде, потому-что вы не являетесь разработчиком бота!`)
        .setTimestamp()
      message.channel.send({ embeds: [gen] })
    }
  }
}