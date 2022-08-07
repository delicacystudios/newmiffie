const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const config = require('../../configs/config.js');
const emojies = require('../../configs/emoji.js');

const infoem = emojies.categories.infoctg;
const utilem = emojies.categories.utilctg;
const modem = emojies.categories.modctg;
const funem = emojies.categories.functg;
const premem = emojies.categories.premctg;

const GuildSettings = require("../../database/settings.js");

module.exports = {
  name: "help",
  description: "Команды и возможности бота",
  usage: "",
  category: "Information",
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const premuser = await premSchema.findOne({ User: message.author.id });
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    // // // //

    let storedSettings = await GuildSettings.findOne({
      guildID: message.guild.id,
    });

    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: message.guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await GuildSettings.findOne({ guildID: message.guild.id });
    };

    let prefix = config.chat.prefix;
    if (storedSettings && storedSettings.prefix) {
      prefix = storedSettings.prefix;
    }

    ///// ///// ///// ///// /////

    const Info = message.client.commands.filter(x => x.category == 'Information')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const general = new MessageEmbed()
      .setAuthor({ name: `♡ Категория: Информация ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Info)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    const Util = message.client.commands.filter(x => x.category == 'Utility')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const util = new MessageEmbed()
      .setAuthor({ name: `♡ Категория: Утилиты ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Util)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    const Fun = message.client.commands.filter(x => x.category == 'Fun')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const fun = new MessageEmbed()
      .setAuthor({ name: `♡ Категория: Развлечения ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Fun)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    const Mod = message.client.commands.filter(x => x.category == 'Moderation')
      .map((x) =>
        `<:beta:945072686244167701> \`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const mod = new MessageEmbed()
      .setAuthor({ name: `♡ Категория: Модерация ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Mod)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    const Prem = message.client.commands.filter(x => x.category == 'Premium')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const premembed = new MessageEmbed()
      .setAuthor({ name: `♡ Категория: Модерация ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Prem)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    const nopremi = new MessageEmbed()
      .setColor(color)
      .setDescription(`Извините, но вам нужно иметь премиум, чтобы получить доступ к данной категории!`)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    if (!args[0]) {
      const intro = new MessageEmbed()
        .setAuthor({ name: `♡ Помощь по командам ${premstatus} ♡` })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor(color)
        .setDescription(`Чтобы получить справку по категориям команд бота используйте меню, которое есть под сообщением.

\`< >\` — Необязательные аргументы.
\`[ ]\` — Обязательные аргументы.`)

      const helpMenu = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('help-menu')
            .setPlaceholder('Выберите категорию')
            .addOptions([
              {
                label: `Информация`,
                description: 'Главная категория бота',
                value: `1`,
                emoji: `${infoem}`
              },
              {
                label: `Утилиты`,
                description: 'Интересные информативные функции',
                value: `2`,
                emoji: `${utilem}`
              },
              {
                label: `Развлечения`,
                description: 'Весёлые и прикольные команды)',
                value: `3`,
                emoji: `${funem}`
              },
              {
                label: `Модерация`,
                description: 'Управление и модерирование серверов',
                value: `4`,
                emoji: `${modem}`
              },
              {
                label: `Премиум`,
                description: 'Премиум функции бота',
                value: `5`,
                emoji: `${premem}`
              },
            ])
        )

      const filter = (interaction) =>
        interaction.isSelectMenu() &&
        interaction.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        time: 60 * 1000
      });

      collector.on('collect', async (collected) => {
        if (collected.values[0] === '1') {
          collected.reply({ embeds: [general], ephemeral: true }).catch(
            () => collected.editReply({ embeds: [general], ephemeral: true })
          )

        } else if (collected.values[0] === '2') {
          collected.reply({ embeds: [util], ephemeral: true }).catch(
            () => collected.editReply({ embeds: [util], ephemeral: true })
          )

        } else if (collected.values[0] === '3') {
          collected.reply({ embeds: [fun], ephemeral: true }).catch(
            () => collected.editReply({ embeds: [fun], ephemeral: true })
          )

        } else if (collected.values[0] === '4') {
          collected.reply({ embeds: [mod], ephemeral: true }).catch(
            () => collected.editReply({ embeds: [mod], ephemeral: true })
          )

        } else if (collected.values[0] === '5') {
          if (!premuser) {
            collected.reply({ embeds: [nopremi], ephemeral: true }).catch(
              () => collected.editReply({ embeds: [nopremi], ephemeral: true })
            )
          } else if (premuser) {
            collected.reply({ embeds: [premembed], ephemeral: true }).catch(
              () => collected.editReply({ embeds: [premembed], ephemeral: true })
            )
          }
        }
      })

      const content = {
        embed: intro,
        component: helpMenu
      }

      const mss12 = await message.reply({ embeds: [content.embed], components: [content.component] }).catch(
        (e) => message.channel.send({ embeds: [content.embed], components: [content.component] })
      )

      collector.on('end', async message => {
        const helpMenu2 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId('help-menu')
              .setPlaceholder('Время выбора истекло!')
              .setDisabled(true)
              .addOptions([
                {
                  label: `Информация`,
                  description: 'Главная категория бота',
                  value: `1`,
                  emoji: `${infoem}`
                },
                {
                  label: `Утилиты`,
                  description: 'Интересные информативные функции',
                  value: `2`,
                  emoji: `${utilem}`
                },
                {
                  label: `Развлечения`,
                  description: 'Весёлые и прикольные команды)',
                  value: `3`,
                  emoji: `${funem}`
                },
                {
                  label: `Модерация`,
                  description: 'Управление и модерирование серверов',
                  value: `4`,
                  emoji: `${modem}`
                },
                {
                  label: `Премиум`,
                  description: 'Премиум функции бота',
                  value: `5`,
                  emoji: `${premem}`
                },
              ])
          )
        mss12.edit({ components: [helpMenu2] }).catch(
          (e) => console.log('Сообщение не найдено!')
        )
      })
    }
  }
}