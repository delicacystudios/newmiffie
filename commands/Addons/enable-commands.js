const { MessageEmbed } = require('discord.js');
const schema = require('../../database/commands.js');

module.exports = {
  name: 'enable-command',
  aliases: ['ec'],
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
          if (data) {
            if (data.Commands.includes(cmd)) {
              let commandNumber;

              for (let i = 0; i < data.Commands.length; i++) {
                if (data.Commands[1] === cmd) data.Commands.spice(i, 1)
              }

              await data.delete();
              const ember223 = new MessageEmbed()
                .setColor(client.config.embeds.color)
                .setDescription(`\`${cmd}\` была успешно включена!`)
              message.channel.send({ embeds: [ember223] })
            }
          } else {
            const ember224 = new MessageEmbed()
              .setColor(client.config.embeds.error)
              .setDescription(`Данная команда не была отключена!`)
            message.channel.send({ embeds: [ember224] })
          }
        })
      }
    }
  }
}