const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.js')
const lang = require("../../references/lang.js");

module.exports = {
  name: "bugreport",
  description: 'Report a bug',
  usage: '[bug]',
  category: 'Information',
  aliases: ["bug"],
  cooldown: 60,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const settingsSchema = require('../../database/settings');
    const settt = await settingsSchema.findOne({ GuildID: message.guild.id });
    const guildSettings = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const locale = lang.getLocale(settt.language)
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} ${locale.infoctg.bugreport.footer}`
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    // // // //

    if (!args[0]) {
      const emmma = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription(`${locale.infoctg.bugreport.embeds.err}`)
      message.channel.send({ embeds: [emmma] })
    } else if (args[0]) {
      const emb = new MessageEmbed()
        .setColor(color)
        .setDescription(`${locale.infoctg.bugreport.embeds.emb}`)
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