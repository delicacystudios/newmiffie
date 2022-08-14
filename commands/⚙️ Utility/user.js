const { MessageEmbed } = require('discord.js');
const premSchema = require("../../database/premium.js");
const language = require('../../references/language');

module.exports = {
  name: 'user',
  aliases: [],
  category: "Utility",
  usage: '<пользователь>',
  description: "Информация о пользователе",
  cooldown: 3,
  premium: false,

  run: async (client, message) => {
    const { guild } = message;
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} ${language(guild, 'FOOTER')}`
    // // // //

    let member = message.mentions.members.first() || message.member || client.users.cache.get(args[0]);
    let premMember = await premSchema.findOne({
      User: member.id
    })

    const ps = {
      no: '❌',
      yes: '✅'
    }

    let ava;
    if (premuser) {
      ava = member.avatarURL({ dynamic: true, size: 4096 })
    } else {
      ava = member.avatarURL({ dynamic: false, size: 1024 })
    }
    
    let avatar = premuser ? ava : ava;

    if (member) {
      const mention = message.mentions.members.first() || message.member || client.users.cache.get(args[0]);
      const embed = new MessageEmbed()
        .setColor(color)
        .setThumbnail(avatar)
        .setTitle(`${language(guild, 'USER_INFO')} ${member.displayName}`)
        .addFields(
          {
            name: `\`  ${language(guild, 'USER_MENTION')}  \``,
            value: `> <@${member.user.id}>`,
            inline: true
          },
          {
            name: `\`  ${language(guild, 'USER_PREMST')}  \``,
            value: `> ${premMember ? ps.yes : ps.no}`,
            inline: true
          },
          {
            name: `\`  ${language(guild, 'SERVER_O1')}  \``,
            value: `> \`${mention.joinedAt.toLocaleString()}\``,
          },
          {
            name: `\`  ${language(guild, 'SERVER_O2')}  \``,
            value: `> \`${mention.user.createdAt.toLocaleString()}\``,
            inline: true
          },
          {
            name: `\`  ${language(guild, 'USER_ROLES')}  \``, 
            value: `> ${member.roles.cache.map(r => `${r}`).join(' | ')}`,
          }
        )
        .setFooter({ text: `${namefooter}` })
      message.channel.send({ embeds: [embed] })
    }
  }
}