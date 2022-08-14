const { MessageEmbed } = require("discord.js");
const language = require('../../references/language');

module.exports = {
  name: "clear",
  category: "Utility",
  aliases: ["purge", "clearmsgs"],
  description: "Удалиить сообщения в чате",
  usage: "[количество]",
  cooldown: 3,
  
  run: async (client, message, args) => {
    const { guild } = message;
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'NOPERMS')}`)
      message.channel.send({ embeds: [embed] })

    } else if (!args[0]) {
      const embed2 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'CLEAR_MESSAGES')}`)
      message.channel.send({ embeds: [embed2] })

    } else if (isNaN(args[0])) {
      const embed22 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'CLEAR_NUMBER')}`)
      message.channel.send({ embeds: [embed22] })

    } else if (args[0] > 100) {
      const embed23 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'CLEAR_MSG1')} \`${args[0]}\` ${language(guild, 'CLEAR_MSG2')}`)
      message.channel.send({ embeds: [embed23] })

    } else {
      let Reason = args.slice(1).join(" ") || "No Reason Provided!";
      message.channel.bulkDelete(args[0]).then(Message => {
        const embed = new MessageEmbed()
          .setColor(client.config.embeds.color)
          .setTitle(`${language(guild, 'CLEAR_T1')} ${Message.size} ${language(guild, 'CLEAR_T2')}`)
          .addFields(
            {
              name: ` ${language(guild, 'CLEAR_R')} `,
              value: `<@${message.author.id}> | \`(${message.author.id})\``
            },
            {
              name: ` ${language(guild, 'CLEAR_C')} `,
              value: `${message.channel.name} | \`(${message.channel.id})\``
            }
          )
        message.channel.send({ embeds: [embed] })
      })
    }
  }
}