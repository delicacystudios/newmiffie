const { MessageEmbed } = require ('discord.js');
const config = ('../../configs/config.js');

module.exports = {
  name: "ban",
  aliases: [],
  description: 'Выдать бан пользователю',
  category: "Moderation",
  usage: '[пользователь]',
  premium: false,

  run: async (client, message, args) => {
    let user = message.mentions.members.first()
    if (!user) user = message.guild.members.cache.find(u => u.id === args[0])
    if (!user) return message.channel.send('Пожалуйста, укажите пользователя')
    if (!user.bannable) { 
      return message.channel.send('Данный пользователь не может быть забанен!')
    } else if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      return message.channel.send(`У меня недостаточно прав для того, чтобы банить! Пожалуйста, проверьте право \`Ban Members\`!`)
    }
    await user.ban()
    message.channel.send(`${user} был забанен!`)
  }
}