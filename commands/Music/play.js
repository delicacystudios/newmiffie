module.exports = {
  name: 'play', // Название команды
  description: 'play', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '[song]', // Оставьте пустым, если не требуются аргументы
  category: 'Music', // Категория
  cooldown: 3,
  premium: false, // true - премиум команда / false - не премиум команда
  
  run: async (client, message, args) => {
    const res = await client.manager.search(
      message.content.slice(6),
      message.author
    );
    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });
    player.connect();

    player.queue.add(res.tracks[0]);
    message.channel.send({ content: `Enqueuing track ${res.tracks[0].title}.`});

    if (!player.playing && !player.paused && !player.queue.size) player.play();
  }
}