const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'skip', // Название команды
  description: 'skip', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '', // Оставьте пустым, если не требуются аргументы
  category: 'Music', // Категория
  cooldown: 3,
  premium: false, // true - премиум команда / false - не премиум команда
  
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    console.log(player);
    player.stop();
  }
}