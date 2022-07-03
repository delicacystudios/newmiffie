const config = require('../../configs/config.js');
const { MessageEmbed } = require('discord.js')
const schema = require('../../database/settings');

module.exports = {
  name: "setprefix",
  aliases: ['prefix'],
  description: 'Сменить префикс бота',
  category: "Utility",
  usage: '[аргументы]',
  permissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      const noperms = new MessageEmbed()
        .setColor(config.embeds.color)
        .setDescription('У вас недостаточно прав для смены ника!')
      message.channel.send({ embeds: [noperms] })
    }

    const data = await schema.findOne({
      guildID: message.guild.id
    });

    if (!args[0]) {
      const noprefix = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Вам необходимо указать новый префикс!')
      message.channel.send({ embeds: [noprefix] })
    } else if (args[0].length > 3) {
      const size = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Ваш префикс должен содержать не более \`3\` символов!')
      message.channel.send({ embeds: [size] })
    } else if (data) {
      await schema.findOneAndRemove({
        guildID: message.guild.id
      })

      const succ = new MessageEmbed()
        .setColor(config.embeds.color)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
        .setFooter({ text: `${client.user.username} © Все права защищены` })
      message.channel.send({ embeds: [succ] })

      let newData = new schema({
        prefix: args[0],
        guildID: message.guild.id
      })

      newData.save()
    } else if (!data) {
      const succ = new MessageEmbed()
        .setColor(config.embeds.color)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
        .setFooter({ text: `${client.user.username} © Все права защищены` })
      message.channel.send({ embeds: [succ] })

      let newData = new schema({
        prefix: args[0],
        guildID: message.guild.id
      })
      newData.save()
    }
  }
}