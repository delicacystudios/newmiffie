const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: 'avatar',
  aliases: ["Аватар"],
  category: "Utility",
  description: `Получить аватар пользователя`,
  usage: `<пользователь>`,
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    // // // // 
    
    const member = message.mentions.members.first()
      || message.guild.members.cache.get(args[0])
      || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ')
      || x.user.username === args[0])
      || message.member;

    if (member.user.avatarURL)  {
      const avatar = new MessageEmbed()
        .setColor(color)
        .setImage(member.user.avatarURL({ size: 4096, dynamic: true }))
      message.channel.send({ embeds: [avatar] }).catch(
        (err) => {
          const embed = new MessageEmbed()
            .setColor(config.embeds.error)
            .setDescription(`${member.user.username} не имеет аватара!`);
          message.channel.send({ embeds: [embed] })
        }
      )
    }
  }
}  