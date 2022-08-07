/* const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');
const guildSettings = require('../../database/settings')

module.exports = {
  name: "welcome-channel",
  description: 'Приветсвуйте новых пользователей',
  usage: [],
  aliases: ["wc"],
  category: "Moderation",
  premium: false,
  cooldown: 3,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });

    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    // // // //

    if (!args[0]) {
      const mess = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription(`Извините, вы забыли указать агргументы!
            Подробная информация по команде:`)
        .setFields(
          {
            name: `welcome-channel set #channel`,
            value: `\`\`\`Установить канал для отправки сообщения при входе человека на сервер\`\`\``,
            inline: true
          },
          {
            name: `welcome-channel custom <текст>`,
            value: `\`\`\`Изменить текст, который отправляется в чат\`\`\``,
            inline: true
          },
          {
            name: `welcome-channel disable`,
            value: `\`\`\`Отключить канал, в который отправляются сообщения\`\`\``,
            inline: true
          },
          {
            name: `welcome-channel test`,
            value: `\`\`\`Отправить тестовое сообщение в канал\`\`\``,
            inline: true
          },
          {
            name: `welcome-channel test`,
            value: `\`\`\`Отправить тестовое сообщение в канал\`\`\``,
            inline: true
          },
          {
            name: `Доступные варианты для выбора:`,
            value: `\`\`\`
                {user.ping} - @KSJaay#2487
                {user.name} - KSJaay
                {user.id} - 528930032823959562
                {user.tag} - KSJaay#2487
                {guild.name} - NateAles's Hotel
                {guild.id} - 984299198491004968
                {guild.totalUser} - 123
                
              \`\`\``,
            inline: true
          }
        )
      message.channel.send({ embeds: [mess] })
    }

    const data = await guildSettings.findOne({ guildID: message.guild.id })

    if (!data.addons.welcome) {
      data.addons.welcome = {
        enabled: false,
        channel: "",
        message: "",
        image: false,
        embed: false
      }

      data.markModified('addons.welcome');
      await data.save();

    } else if (args.join(" ").toLowerCase() === "disable") {
      data.addons.welcome.enabled = false;
      data.markModified('addons.welcome');
      await data.save();
      const succs = new MessageEmbed()
        .setColor(color)
        .setDescription('Ваши настройки были успешно сохранены!')
      message.channel.send({ embeds: [succs] })

    } else if (args.join(" ").toLowerCase() === "test") {
      if (!data.addons.welcome.enabled || data.addons.welcome.channel.trim() === "") {
        const error22 = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription('На данный момент, канал для сообщений не настроен!')
        message.channel.send({ embeds: [error22] })

      } else {
        let channel = await message.guild.channels.cache.get(data.addons.welcome.channel, message.guild);
        let welcomeMsg = (data.addons.welcome.message === null ||
          data.addons.welcome.message === "" ||
          data.addons.welcome.message === " ") ? "{user.ping} вошёл на сервер!" : data.addons.welcome.message;

        let fmsg = await welcomeMsg()
          .replace("{user.ping}", `${message.author}`)
          .replace("{user.name}", `${message.author.username}`)
          .replace("{user.id}", `${message.author.id}`)
          .replace("{user.tag}", `${message.author.tag}`)
          .replace("{guild.name}", `${message.guild.name}`)
          .replace("{guild.id}", `${message.guild.id}`)
          .replace("{guild.totalUser}", `${message.guild.memberCount}`);
        channel.send({ content: [fmsg] });
      }
    } else if (!args[1]) {
      const err123 = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Извините, но вы забыли указать дополнительные аргументы!')
      message.channel.send({ embeds: [err123] })

    } else if (args.join(" ").toLowerCase() === "set") {
      let channel = await message.guild.channels.cache.get(args[1], message.guild);
      if (!channel) {
        const undefi = new MessageEmbed()
          .setColor(config.embeds.error)
          .setDescription(`Невозможно найти указанный канал`)
        message.channel.send({ embeds: [undefi] })
      } else {
        data.addons.welcome.enabled = true;
        data.addons.welcome.channel = channel.id;
        data.markModified('addons.welcome');
        await data.save();

        const succ2 = new MessageEmbed()
          .setColor(color)
          .setDescription(`Каналом для приветствий был установлен - ${channel}`)
        message.channel.send({ embeds: [succ2] });
      }

    } else if (args.join(" ").toLowerCase() === "custom") {
      let msg = args.slice(1).join(" ");
      data.addons.welcome.message = msg;
      data.markModified('addons.welcome');
      await data.save();

      const succ3 = new MessageEmbed()
        .setColor(color)
        .setDescription(`Сообщение приветствия было установлено: \`${msg}\``)
      message.channel.send({ embeds: [succ3] })
    }
  }
} */