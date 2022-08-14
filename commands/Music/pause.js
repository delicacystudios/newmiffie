const { Constants } = require('discord.js')

module.exports = {
  name: 'pause', // Название команды
  description: 'pause', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '', // Оставьте пустым, если не требуются аргументы
  category: 'Music', // Категория
  cooldown: 3,
  premium: false, // true - премиум команда / false - не премиум команда
  
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (player.paused) {
      player.pause(false); // this will unpause the player
      message.channel.send({ content: "Player is no longer paused."});
    } else {
      player.pause(true); // this will pause the player
      message.channel.send({ content: "Player is now paused."});
    }
  }
}