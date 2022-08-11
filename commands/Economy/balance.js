const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'balance',
  aliases: ["bal", 'money'],
  category: "Economy",
  description: "Выдать деньги участнику",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args, profileData) => {
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.color)
        .setDescription(`Ваш текущий баланс - \`${profileData.MiCoins}\`
          Ваш баланс в банке - \`${profileData.Bank}\``)
      message.channel.send({ embeds: [embed] })
    }
  }
}