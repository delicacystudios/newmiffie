const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: 'avatar',
  aliases: ["Аватар"],
  category: "info",
  description: "Аватар пользователя",
  usage: "<пользователь>",

  run: async (client, message, args) => {
    const member = message.mentions.members.first()
      || message.guild.members.cache.get(args[0])
      || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ')
      || x.user.username === args[0])
      || message.member;

      const embed = new MessageEmbed()
        .setColor(config.embeds.error)
        .setTitle(`${member.user.username} не имеет аватара!`);
      
    if (member.user.avatarURL) {
      const avatar = new MessageEmbed()
        .setColor(config.embeds.color)
        .setImage(member.user.avatarURL({ size: 4096, dynamic: true }))
      message.channel.send({ embeds: [avatar] }).catch(
        (e) => message.channel.send({ embeds: [embed] }))
    }
  }
}