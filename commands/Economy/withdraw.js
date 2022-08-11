const { MessageEmbed } = require('discord.js');
const profileModel = require("../../database/profile");

module.exports = {
  name: 'withdraw',
  aliases: ["wd"],
  category: "Economy",
  description: "Снять деньги с банка",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args, profileData) => {
    const amount = args[0];

    if (amount % 1 != 0 || amount <= 0) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Недопустимое значение!`)
      message.channel.send({ embeds: [embed] })
      
    } else {
      try {
        if (amount > profileData.bank) {
          const embed2 = new MessageEmbed()
            .setColor(client.config.embeds.error)
            .setDescription(`У вас недостаточно средств в банке для перевода!`)
          message.channel.send({ embeds: [embed2] })
        } else {
          await profileModel.findOneAndUpdate({
            UserID: message.author.id
          }, {
            $inc: {
              MiCoins: amount,
              Bank: -amount
            }
          })
          const embed22 = new MessageEmbed()
            .setColor(client.config.embeds.color)
            .setDescription(`Вы перевели ${amount} в ваш кошелёк!`)
          message.channel.send({ embeds: [embed22] })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}