const { MessageEmbed } = require ('discord.js');
const config = ('../../configs/config.js');

module.exports = {
  name: "kick",
  aliases: [],
  description: 'Кикнуть пользователя',
  category: "Moderation",
  usage: '[пользователь] <:beta:945072686244167701>',

  run: async (client, message, args) => {
    let user = message.mentions.members.first()
    if (!user) user = message.guild.members.cache.find(u => u.id === args[0])

    const who = new MessageEmbed()
      .setColor('#fe8780')
      .setDescription('Пожалуйста, в следующий раз, укажите пользователя')
    
    if (!user) 
      return message.channel.send({ embeds: [who] })

    if (user.permissions.has("ADMINISTRATOR")) {
      const admin = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('Ошибка: У вас недостаточно прав!')
      message.channel.send({ embeds: [admin] })
      
    } else if (user.roles.highest.position > message.member.roles.highest.position) {
      const higher = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('Ошибка: Данный пользователь находится выше вас!')
      message.channel.send({ embeds: [higher] })
      
    } else if (user.roles.highest.position > message.guild.me.roles.highest.position) {
      const bothigher = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('Ошибка: Пользователь находится выше роли бота!')
      message.channel.send({ embeds: [bothigher] })
      
    } else if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      const perms = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('У меня недостаточно прав для того, чтобы кикать! Пожалуйста, проверьте право \`Kick Members\`')
      message.channel.send({ embeds: [perms] })
    }

    await user.kick().catch(err => {
      console.log('Ошибка: Невозможно кикнуть человека')
    })
    const embed = new MessageEmbed()
      .setColor('#a94dff')
      .setDescription(`${user} был успешно кикнут!`)
    message.channel.send({ embeds: [embed] })
  }
}