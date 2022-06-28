const { MessageEmbed } = require ('discord.js');
const figlet = require ("figlet");
const config = require('../../configs/config.js')

module.exports = {
  name: "ascii",
  aliases: [],
  description: 'Перевести свой текст в ASCII',
  category: "Fun",
  usage: '[текст]',
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    figlet.text(args.join(" "), (err, text) => {
      if (!args.join(" ")) {
        const errorem = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription("Вам нужно ввести сообщение, для того, чтобы получить ascii версию!")
        message.channel.send({ embeds: [errorem] })
        
      } else if (args.join(" ").length > 8) {
        const moret = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription('Ваше сообщение не должно привышать 8 символов!')
        message.channel.send({ embeds: [moret] })
        
      } else if (args.join(" ")) {
        const embed = new MessageEmbed()
          .setColor(config.embeds.color)
          .setDescription(`\`\`\`${text.trimRight()}\`\`\``)
        message.channel.send({ embeds: [embed] })
      }
    })
  }
}