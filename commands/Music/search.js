const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'search', // Название команды
  description: 'play', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '[args]', // Оставьте пустым, если не требуются аргументы
  category: 'Music', // Категория
  cooldown: 3,
  premium: false, // true - премиум команда / false - не премиум команда
  
  run: async (client, message, args) => {
    const index = message.content.indexOf(" ");
    const query = message.content.slice(index + 1);
    const results = await client.manager.search(query, message.author);
    const tracks = results.tracks.slice(0, 10);
    let resultsDescription = "";
    let counter = 1;
    
    for (const track of tracks) {
      resultsDescription += `${counter}) [${track.title}](${track.uri})\n`;
      counter++;
    }
    const embed = new MessageEmbed().setDescription(resultsDescription);
    message.channel.send({ content: "What song would you like to choose? Enter the number.", embeds: [embed]})
    const response = await message.channel.awaitMessages(
      (msg) => msg.author.id === message.author.id,
      {
        max: 1,
        time: 30000,
      }
    );
    const answer = response.first().content;
    const track = tracks[answer - 1];
    console.log(track);
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      player.queue.add(track);
      message.channel.send({ content: `${track.title} was added to the queue.`});
    } else {
      message.channel.send(
        { content: "The bot is not in a voice channel or does not have a player existing."}
      );
    }
  }
}