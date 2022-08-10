const { MessageEmbed } = require('discord.js');
const pgSchema = require('../../database/pg.js');
const day = require('dayjs');

module.exports = {
  name: 'deletePG',
  description: 'Удалить премиум у сервера',
  usage: '[ID сервера]',
  category: 'Owner',
  aliases: ['dpg'],

  run: async (client, message, args) => {
    if (message.author.id == client.config.bot.devID) {
      if (!args[0]) {
        const errargs = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription(`Пожауйста, укажите ID сервера, у которого вы бы хотеи удалить премиум`)
        message.channel.send({ embeds: [errargs] })
        
      } else if (!client.guilds.cache.has(args[0])) {
        const errnull = new MessageEmbed()
          .setColor(client.config.embeds.developer)
          .setDescription(`Бот не находится на данном сервере!`)
        message.channel.send({ embeds: [errnull] })
        
      } else {
        const Expire = day(args[1]).valueOf();
        
        pgSchema.findOne({ GuildID: args[0]}, async(err, data) => {
          if (!data) {
            const nodada = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription(`Данный сервер не имеет премиум!`)
            message.channel.send({ embeds: [nodada] })
          } else {
            data.delete()

            const dada = new MessageEmbed()
              .setColor(client.config.embeds.developer)
              .setDescription(`Настройки быи сохранены!`)
            message.channel.send({ embeds: [dada] })
          }  
        })
      }
    }
  }
}