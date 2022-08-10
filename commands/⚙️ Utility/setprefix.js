const { MessageEmbed } = require('discord.js');
const schema = require('../../database/settings');

module.exports = {
  name: "setprefix",
  aliases: ['prefix'],
  description: 'Сменить префикс бота',
  category: "Utility",
  usage: '[аргументы]',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} © Все права защищены`
    // // // //

    const data = await schema.findOne({
      guildID: message.guild.id
    });

    if (message.member.id != client.config.bot.devID) {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
        const noperms = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('У вас недостаточно прав для смены префикса!')
        message.channel.send({ embeds: [noperms] })
      } else {
        if (!args[0]) {
          const noprefix = new MessageEmbed()
            .setColor(client.config.embeds.error)
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
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
            .setFooter({ text: `${namefooter}` })
          message.channel.send({ embeds: [succ] })

          let newData = new schema({
            prefix: args[0],
            guildID: message.guild.id
          })

          newData.save()
        } else if (!data) {
          const succ = new MessageEmbed()
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
            .setFooter({ text: `${namefooter}` })
          message.channel.send({ embeds: [succ] })

          let newData = new schema({
            prefix: args[0],
            guildID: message.guild.id
          })
          newData.save()
        }
      }
    }

    if (message.member.id == client.config.bot.devID) {
      if (!args[0]) {
        const noprefix = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Вам необходимо указать новый префикс!')
        message.channel.send({ embeds: [noprefix] })

      } else if (args[0].length > 3) {
        const size = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription('Ваш префикс должен содержать не более \`3\` символов!')
        message.channel.send({ embeds: [size] })

      } else if (data) {
        await schema.findOneAndRemove({
          guildID: message.guild.id
        })

        const succ = new MessageEmbed()
          .setColor(color)
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
          .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
          .setFooter({ text: `${namefooter}` })
        message.channel.send({ embeds: [succ] })

        let newData = new schema({
          prefix: args[0],
          guildID: message.guild.id
        })

        newData.save()

        client.users.fetch(message.guild.ownerId).then((user) => {
          const ownersend = new MessageEmbed()
            .setColor(color)
            .setDescription(`Префикс вашего сервера был изменен разработчиком на \`${args[0]}\``)
          user.send({ embeds: [ownersend] })
        });
        const ownersend = new MessageEmbed()
          .setColor(color)
          .setDescription(`Префикс вашего сервера был изменен разработчиком на \`${args[0]}\``)
      } else if (!data) {
        const succ = new MessageEmbed()
          .setColor(color)
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
          .setDescription(`Префикс [**\` ${args[0]} \`**] был успешно установлен в — **${message.guild.name}**`)
          .setFooter({ text: `${namefooter}` })
        message.channel.send({ embeds: [succ] })

        let newData = new schema({
          prefix: args[0],
          guildID: message.guild.id
        })
        newData.save()

        client.users.fetch(message.guild.ownerId).then((user) => {
          const ownersend = new MessageEmbed()
            .setColor(color)
            .setDescription(`Префикс вашего сервера был изменен разработчиком на \`${args[0]}\``)
          user.send({ embeds: [ownersend] })
        });
      }
    }
  }
}