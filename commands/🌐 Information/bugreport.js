const { MessageEmbed } = require('discord.js');
const language = require('../../references/language');

module.exports = {
  name: "bugreport",
  description: 'Сообщить о баге \ Предложить идею',
  usage: '[bug]',
  category: 'Information',
  aliases: ["bug", "idea"],
  cooldown: 60,
  premium: false,

  run: async (client, message, args) => {
    const { guild } = message;
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const settingsSchema = require('../../database/settings');
    const settt = await settingsSchema.findOne({ GuildID: message.guild.id });
    const guildSettings = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} ${language(guild, 'FOOTER')}`
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    // // // //

    if (!args[0]) {
      const emmma = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'BUGREP_NOARGS')}`)
      message.channel.send({ embeds: [emmma] })
      
    } else if (args[0]) {
      const emb = new MessageEmbed()
        .setColor(color)
        .setDescription(`${language(guild, 'BUGREP_THX')}`)
        .setFooter({ text: `${namefooter}` })
      message.channel.send({ embeds: [emb] })
      if (premuser) {
        const channel = client.channels.cache.get(client.config.systems.bugreport)
        const embedprem = new MessageEmbed()
          .setAuthor({ name: `Баг-репорт: ${message.author.tag}` })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
          .setColor(color)
          .setDescription(args.join(" "))
          .setFooter({ text: `${premstatus}` })
          .setTimestamp()
        channel.send({ content: `<@528930032823959562>`, embeds: [embedprem] })
        
      } else {
        const channel = client.channels.cache.get(client.config.systems.bugreport)
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