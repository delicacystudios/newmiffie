const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { version } = require("discord.js");
const settings = require('../../database/settings');

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "utility",
  
  run: async (client, message, args) => {
    const sett = await settings.findOne({ guildID: message.guild.id });
    const prefix = sett.prefix;
    const uptime = client.uptime;
    const createdAt = `${client.user.createdTimestamp}`
    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = new MessageEmbed()
      .setColor(client.config.embeds.developer)
      .setAuthor({ name: `Main information`})
      .addFields(
        {
          name: `ID:`,
          value: `\`${client.user.id}\``,
          inline: true
        },
        {
          name: `Tag:`,
          value: `\`${client.user.tag}\``,
          inline: true
        },
        {
          name: `Prefix:`,
          value: `\`${prefix}\``,
          inline: true
        },
        {
          name: `Version:`,
          value: `\`v${require("../../package.json").version}\``,
          inline: true
        },
        {
          name: `Github Repo:`,
          value: `[delicacystudios/newmiffie](https://github.com/delicacystudios/newmiffie)`,
          inline: true
        },
        {
          name: `Created At:`,
          value: `\`v${createdAt}\``,
          inline: true
        }
      )
    const embed2 = new MessageEmbed()
      .setAuthor({ name: `Statistics` })
      .setColor(client.config.embeds.developer)
      .addFields(
        {
          name: `Users:`,
          value: `\`${client.users.cache.size}\``,
          inline: true
        },
        {
          name: `Servers:`,
          value: `\`${client.guilds.cache.size}\``,
          inline: true
        },
        {
          name: `Channels:`,
          value: `\`${client.channels.cache.size}\``,
          inline: true
        },
        {
          name: `Command Count:`,
          value: `\`${client.commands.size}\``,
          inline: true
        }
      )
    const embed3 = new MessageEmbed()
      .setAuthor({ name: `System Information` })
      .setColor(client.config.embeds.developer)
      .addFields(
        {
          name: `RAM Usage:`,
          value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``,
          inline: true
        },
        {
          name: `Uptime:`,
          value: `\`${uptime}\``,
          inline: true
        },
        {
          name: `Discord.js:`,
          value: `\`v${version}\``,
          inline: true
        },
        {
          name: `NodeJS:`,
          value: `\`${process.version}\``,
          inline: true
        },
        {
          name: `Platform:`,
          value: `\`${process.platform}\``,
          inline: true
        }
      )

    const button1 = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${client.config.chat.server}`);

    const button2 = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`);

    const row = new MessageActionRow()
      .addComponents([button1, button2]);


    return message.channel.send({ embeds: [embed, embed2, embed3], components: [row] });
  }
};