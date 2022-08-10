const { MessageEmbed } = require ('discord.js');
const figlet = require ("figlet");

module.exports = {
  name: "ascii",
  aliases: [],
  description: 'Перевести свой текст в ASCII',
  category: "Fun",
  usage: '[текст]',
  cooldown: 3,
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    figlet.text(args.join(" "), (err, text) => {
      if (!args.join(" ")) {
        const errorem = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription("Вам нужно ввести сообщение, для того, чтобы получить ascii версию!")
        message.channel.send({ embeds: [errorem] })
        
      } else if (args.join(" ").length > 10) {
        const moret = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Ваше сообщение не должно привышать 8 символов!')
        message.channel.send({ embeds: [moret] })
        
      } else if (args.join(" ")) {
        message.channel.send({ content: `\`\`\`\`\`\`${text.trimRight()}\`\`\`\`\`\`` })
      }
    })
  }
}