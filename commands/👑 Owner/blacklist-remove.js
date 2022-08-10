const { MessageEmbed } = require('discord.js');
const schema = require('../../database/blacklist')

module.exports = {
  name: 'blacklist-remove',
  description: 'Добавить сервер в черный список',
  usage: '[ID сервера]',
  category: 'Owner',
  aliases: ['blr'],

  run: async (client, message, args) => {
    if (message.author.id == client.config.bot.devID) {
      const id = args[0];
      if (!id) {
        const embed = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription('Пожалуйста, укажите \`ID\` сервера!')
        message.channel.send({ embeds: [embed] })
      } else {
        schema.findOne({
          Server: id
        }, async (err, data) => {
          if (!data) {
            const embed4 = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription('Данный сервер не находится в чёрном списке серверов!')
            message.channel.send({ embeds: [embed4] })
          } else if (data) {
            data.delete();
            const embed3 = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription(`\`${id}\` был удалён из чёрного списка серверов!`)
            message.channel.send({ embeds: [embed3] })
          }
        })
      }
    }
  }
}