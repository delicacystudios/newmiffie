const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: "invite",
  aliases: [],
  description: 'Пригласить бота на свой сервер',
  category: "Information",
  usage: '',

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(config.embeds.color)
      .setDescription(`[Нажмите здесь](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot), чтобы пригласить <@${client.user.id}> на ваш сервер`)
    message.reply({ embeds: [embed] }).catch(error => console.log({ content: `Ошибка: Невозможно отправить сообщение в канал` }))
  }
}