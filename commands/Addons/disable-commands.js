const { MessageEmbed } = require('discord.js');
const schema = require('../../database/commands.js');

module.exports = {
  name: 'disable-command',
  aliases: ['dc'],
  description: 'Включить команду',
  category: 'Addons',
  usage: '[команда]',
  premium: false,
  cooldown: 3,

  run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      const ember = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription('Вы должны быть администратором данного сервера, чтобы отключать команды!')
      message.channel.send({ embeds: [ember] })
      
    } else {
      const cmd = args[0];
      if (!cmd) {
        const ember2 = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Пожалуйста, укажите команду для отключения!')
        message.channel.send({ embeds: [ember2] })
        
      } else if (!!client.commands.get(cmd) === false) {
        const ember22 = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Данной команды не существует в функционале бота!')
        message.channel.send({ embeds: [ember22] })
        
      } else {
        schema.findOne({
          GuildID: message.guild.id
        }, async (err,data) => {
          if (err) throw err;
          if (data) {
            if (data.Commands.includes(cmd)) {
              const ember223 = new MessageEmbed()
                .setColor(client.config.embeds.error)
                .setDescription('Данная команда уже была отключена!')
              message.channel.send({ embeds: [ember223] })
            } else {
              data.Commands.push
            }
          } else {
            data = new schema({
              GuildID: message.guild.id,
              Commands: cmd
            })
            await data.save();
            const ember2234 = new MessageEmbed()
              .setColor(client.config.embeds.color)
              .setDescription(`\`${cmd}\` была успешно отключена!`)
            message.channel.send({ embeds: [ember2234] })
          }
        })
      }
    }
  }
}