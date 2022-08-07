const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: "status",
  description: "Изменить статус бота",
  category: 'Owner',
  usage: "",
  premium: false,

  run: async (message, args, client) => {
    if (!message.author.id == config.bot.devID) {
      const robe = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Извините, вы не можете получить доступ к данной команде, потому-что вы не являетесь разработчиком бота!')
      message.channel.send({ embeds: [robe] })
    } else {
      const text = args.join(" ");
      
      if (!text) {
        const robe = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription('Извините, вы не можете получить доступ к данной команде, потому-что вы не являетесь разработчиком бота!')
        message.channel.send({ embeds: [robe] })
      } else {
        client.user.setActivity(text);
        message.channel.send({ content: `Bot Status has been set to ${text}` });
      }
    }
  }
}