const { MessageEmbed } = require('discord.js');
const schema = require('../../database/blacklist')

module.exports = {
  name: 'blacklist-add',
  description: 'Добавить сервер в черный список',
  usage: '[ID сервера]',
  category: 'Owner',
  aliases: ['bla'],

  run: async (client, message, args) => {
    if (message.author.id == client.config.bot.devID) {
      const id = args[0];
      if (!id) {
        const embed = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription('Пожалуйста, укажите \`ID\` сервера!')
        message.channel.send({ embeds: [embed] })
      } else if (!client.guilds.cache.has(id)) {
        const embed2 = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription('Бот не находится на данном сервере!')
        message.channel.send({ embeds: [embed2] })
      } else {
        schema.findOne({
          Server: id
        }, async (err, data) => {
          if (data) {
            const embed3 = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription('Данный сервер уже был добавлен в чёрный список!')
            message.channel.send({ embeds: [embed3] })
          } else {
            new schema({
              Server: id
            }).save();
            const embed3 = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription(`\`${id}\` был успешно добавлен в чёрный список серверов!`)
            message.channel.send({ embeds: [embed3] })
          }
        })
      }
    }
  }
}