const { MessageEmbed } = require ('discord.js');
const config = ('../../configs/config.js');

module.exports = {
  name: "kick",
  aliases: [],
  description: 'Кикнуть пользователя',
  category: "Moderation",
  usage: '[пользователь]',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    let user = message.mentions.members.first()
    if (!user) user = message.guild.members.cache.find(u => u.id === args[0])

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "Без причины"
    
    const who2 = new MessageEmbed()
      .setColor('#fe8780')
      .setDescription('Ошибка: Пожалуйста, укажите пользователя');
    
    if (!user) 
      return message.channel.send({ embeds: [who2] })

    if (user.roles.highest.position > message.member.roles.highest.position) {
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
        .setDescription('Ошибка: У меня недостаточно прав для того, чтобы кикать! Пожалуйста, проверьте право \`Kick Members\`')
      message.channel.send({ embeds: [perms] })

    } else if (user.id === message.author.id) {
      const ownperms2 = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription(`Ошибка: Вы не можете кикнуть себя!`)
      message.channel.send({ embeds: [ownperms2] })
      
    } else if (user.id === message.guild.ownerId) {
      const ownperms = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('Ошибка: У меня недостаточно прав для того, чтобы кикнуть владельца сервера!')
      message.channel.send({ embeds: [ownperms] })
      
    } else if (user.user.bot) {
      const ownperms22 = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription(`Ошибка: Вы не можете кикнуть используемого бота!`)
      message.channel.send({ embeds: [ownperms22] })
      
    } else if (user.permissions.has("ADMINISTRATOR")) {
      const admin = new MessageEmbed()
        .setColor('#fe8780')
        .setDescription('Ошибка: Пользователь имеет права администратора!')
      message.channel.send({ embeds: [admin] })

    } else if (user) {
      const use = new MessageEmbed()
        .setColor(color)
        .setTitle(`Вы были кикнуты из ${message.guild.name}`)
        .addFields(
          {
            name: '`   Причина   `',
            value: `\`\`\` ${reason} \`\`\``,
            inline: true
          },
          {
            name: '`   Модератор:   `',
            value: `${message.member}`,
            inline: true
          }
        )
      user.send({ embeds: [use] }).catch(err => {
        console.log(`Ошибка: Невозможно отправить сообщение ${user.id}`)
      })
      await user.kick().catch(err => {
        console.log('Ошибка: Ошибка: Невозможно кикнуть человека')
      })
      const embed = new MessageEmbed()
        .setColor('#a94dff')
        .setDescription(`${user} был успешно кикнут!`)
      message.channel.send({ embeds: [embed] })
    }
  }
}