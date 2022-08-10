const { MessageEmbed } = require('discord.js');
const pgSchema = require('../../database/pg.js');
const day = require('dayjs');

module.exports = {
  name: 'addPG',
  description: 'Добавить премиум серверу',
  usage: '[ID сервера]',
  category: 'Owner',
  aliases: ['apg'],

  run: async (client, message, args) => {
    if (message.author.id == client.config.bot.devID) {
      if (!args[0]) {
        const errargs = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription(`Пожауйста, укажите ID сервера, которому вы бы хотели выдать премиум`)
        message.channel.send({ embeds: [errargs] })
        
      } else if (!client.guilds.cache.has(args[0])) {
        const errnull = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription(`Бот не находится на данном сервере!`)
        message.channel.send({ embeds: [errnull] })
        
      } else {
        const Expire = day(args[1]).valueOf();
        
        pgSchema.findOne({ GuildID: args[0]}, async(err, data) => {
          if (data) data.delete()
          
          if (args[1]) {
            new pgSchema({
              GuildID: args[0],
              Expire,
              Permanent: false
            }).save();
          } else {
            new pgSchema({
              GuildID: args[0],
              Expire: 0,
              Permanent: true
            }).save();

            const succ = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription('Настройки были сохранены!')
            message.channel.send({ embeds: [succ] })
          }
        })
      }
    }
  }
}