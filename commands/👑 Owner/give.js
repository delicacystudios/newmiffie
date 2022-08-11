const { MessageEmbed } = require('discord.js');
const profileModel = require("../../database/profile");

module.exports = {
  name: 'give',
  aliases: [],
  category: "Economy",
  description: "Выдать MiCoins",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args, profileData) => {
    if (message.author.id == client.config.bot.devID) {
      if (!args.length) {
        const embed = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Пожалуйста, укажите \`ID\` пользователя')
        message.channel.send({ embeds: [embed] })

      } else {
        const amount = args[1];
        const target = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (!target) {
          const embed2 = new MessageEmbed()
            .setColor(client.config.embeds.error)
            .setDescription('Бот не имеет доступ к данному пользователю')
          message.channel.send({ embeds: [embed2] })

        } else {
          if (amount % 1 != 0 || amount <= 0) {
            const embed3 = new MessageEmbed()
              .setColor(client.config.embeds.error)
              .setDescription(`Недопустимое значение!`)
            message.channel.send({ embeds: [embed3] })
          } else {
            try {
              const targetData = await profileModel.findOne({
                UserID: target.id
              });
              if (!targetData) {
                const embed22 = new MessageEmbed()
                  .setColor(client.config.embeds.error)
                  .setDescription('Данный пользователь не находится в датабейсе бота!')
                message.channel.send({ embeds: [embed22] })
              } else {
                await profileModel.findOneAndUpdate({
                  UserID: target.id
                }, {
                  $inc: {
                    MiCoins: amount
                  }
                });
                const embed222 = new MessageEmbed()
                  .setColor(client.config.embeds.developer)
                  .setDescription(`Пользователю <@${target.id}> было выдано \`${amount}\` MiCoins`)
                message.channel.send({ embeds: [embed222] })

              }
            } catch (err) {
              console.log(err)
            }
          }
        }
      }
    }
  }
}