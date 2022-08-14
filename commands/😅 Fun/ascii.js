const { MessageEmbed } = require ('discord.js');
const figlet = require ("figlet");
const language = require('../../references/language')

module.exports = {
  name: "ascii",
  aliases: [],
  description: 'Перевести свой текст в ASCII',
  category: "Fun",
  usage: '[текст]',
  cooldown: 3,
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    const { guild }= message;
    figlet.text(args.join(" "), (err, text) => {
      if (!args.join(" ")) {
        const errorem = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription(`${language(guild, 'ASCII_ERR1')}`)
        message.channel.send({ embeds: [errorem] })
        
      } else if (args.join(" ").length > 10) {
        const moret = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription(`${language(guild, 'ASCII_ERR2')}`)
        message.channel.send({ embeds: [moret] })
        
      } else if (args.join(" ")) {
        message.channel.send({ content: `\`\`\`\`\`\`${text.trimRight()}\`\`\`\`\`\`` })
      }
    })
  }
}