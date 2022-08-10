const Schema = require('../../database/autorole.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'enable-autorole',
  aliases: ["sar", "sa", "ar"],
  category: "Addons",
  description: "Включить автороль",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    const role = await message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0])

    if (!role) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription('Пожалуйста, укажите роль!')
      message.channel.send({ embeds: [embed] })
      
    } else {
      Schema.findOne({
        GuildID: message.guild.id
      }, async (err, data) => {
        if (!data) {
          data = new Schema({
            GuildID: message.guild.id,
            Role: role.id
          })
          await data.save();
          const embed3 = new MessageEmbed()
            .setColor(client.config.embeds.color)
            .setTitle('Автороль успешно была установлена!')
            .setDescription(`Выбранная вами роль -> <@&${data.Role}>
            Выключить аддон можно с помощью ${client.prefix}disable-autorole`)
            .setFooter({ text: `Miffie Addons` })
            .setTimestamp()
          message.channel.send({ embeds: [embed3] })
        } else if (data) {
          const embed2 = new MessageEmbed()
            .setColor(client.config.embeds.error)
            .setDescription('Автороль уже была установлена для этого сервера!')
            .setFooter({ text: `Miffie Addons` })
            .setTimestamp()
          message.channel.send({ embeds: [embed2] })
        }
      })
    }
  }
}