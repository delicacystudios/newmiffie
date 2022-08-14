const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const GuildSettings = require("../../database/settings.js");

const language = require('../../references/language')

module.exports = {
  name: "help",
  description: `Основная команда`,
  usage: "",
  category: "Information",
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
    const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
    const image = `${premuser ? 'https://media.discordapp.net/attachments/984299199967408163/1006991519594594374/PicsArt_22-08-10_00-48-04-236.png' : 'https://media.discordapp.net/attachments/984299199967408163/1006991520810946570/PicsArt_22-08-10_00-25-57-847.png'}`

    const infoem = client.emotes.categories.infoctg;
    const utilem = client.emotes.categories.utilctg;
    const beta = client.emotes.betasign;
    const modem = client.emotes.categories.modctg;
    const funem = client.emotes.categories.functg;
    const premem = client.emotes.categories.premctg;
    // // // //

    const { guild } = message;

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

    let prefix = client.config.chat.prefix;
    if (storedSettings && storedSettings.prefix) {
      prefix = storedSettings.prefix;
    }

    ///// ///// ///// ///// /////

    const Info = message.client.commands.filter(x => x.category == 'Information')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const general = new MessageEmbed()
      .setAuthor({ name: `♡ ${language(guild, 'HELP_CTG_INFO_EMB')} ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Info)
      .setFooter({ text: `${premstatus}` })
      .setImage(image)
      .setTimestamp()

    ///// ///// ///// ///// /////

    const Util = message.client.commands.filter(x => x.category == 'Utility')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const util = new MessageEmbed()
      .setAuthor({ name: `♡ ${language(guild, 'HELP_CTG_UTIL_EMB')} ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Util)
      .setImage(image)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    const Fun = message.client.commands.filter(x => x.category == 'Fun')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const fun = new MessageEmbed()
      .setAuthor({ name: `♡ ${language(guild, 'HELP_CTG_FUN_EMB')} ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Fun)
      .setImage(image)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    const mod = new MessageEmbed()
      .setAuthor({ name: `♡ ${language(guild, 'HELP_CTG_ADDONS_EMB')} ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .addFields(
        {
          name: `Авто-Роли ${beta}`,
          value: `\`${prefix}enable-autorole [роль]\` — Включить автороль
                  \`${prefix}disable-autorole [роль]\` — Выключить автороль`
        },
        {
          name: `Команды ${beta}`,
          value: `\`${prefix}enable-command [команда]\` — Включить команду
                  \`${prefix}disable-command [команда]\` — Выключить команду`
        },
        {
          name: `Бэкапы ${beta}`,
          value: `\`${prefix}create-backup\` — Создать бэкап сервера
                  \`${prefix}load-backup [ID]\` — Загрузить бэкап сервера`
        }
      )
      .setImage(image)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    const Prem = message.client.commands.filter(x => x.category == 'Premium')
      .map((x) =>
        `\`${prefix}` + x.name + `${x.usage ? " " + x.usage : ""}\` — ` + x.description + ``).join('\n');

    const premembed = new MessageEmbed()
      .setAuthor({ name: `♡ ${language(guild, 'HELP_CTG_PREM_EMB')} ♡`, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
      .setColor(color)
      .setDescription(Prem)
      .setImage(image)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    const nopremi = new MessageEmbed()
      .setColor(color)
      .setDescription(`${language(guild, 'NO_PREM_EMB')}`)
      .setImage(image)
      .setFooter({ text: `${premstatus}` })
      .setTimestamp()

    ///// ///// ///// ///// /////

    if (!args[0]) {
      const intro = new MessageEmbed()
        .setAuthor({ name: `♡ ${language(guild, 'HELP_MAIN_EMB')} ${premstatus} ♡` })
        .setColor(color)
        .setDescription(`${language(guild, 'HELP_MAIN_DESCR1')}

\`< >\` — ${language(guild, 'HELP_MAIN_DESCR2')}
\`[ ]\` — ${language(guild, 'HELP_MAIN_DESCR3')}`)
        .setImage(image)

      const helpMenu = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('help-menu')
            .setPlaceholder(`${language(guild, 'HELP_MENU_PLACEHOLDER')}`)
            .addOptions([
              {
                label: `${language(guild, 'HELP_MENU_INFO_LABEL')}`,
                description: `${language(guild, 'HELP_MENU_INFO_DESC')}`,
                value: `1`,
                emoji: `${infoem}`
              },
              {
                label: `${language(guild, 'HELP_MENU_UTIL_LABEL')}`,
                description: `${language(guild, 'HELP_MENU_UTIL_DESC')}`,
                value: `2`,
                emoji: `${utilem}`
              },
              {
                label: `${language(guild, 'HELP_MENU_FUN_LABEL')}`,
                description: `${language(guild, 'HELP_MENU_FUN_DESC')}`,
                value: `3`,
                emoji: `${funem}`
              },
              {
                label: `${language(guild, 'HELP_MENU_ADDONS_LABEL')}`,
                description: `${language(guild, 'HELP_MENU_ADDONS_DESC')}`,
                value: `4`,
                emoji: `${modem}`
              },
              {
                label: `${language(guild, 'HELP_MENU_PREMIUM_LABEL')}`,
                description: `${language(guild, 'HELP_MENU_PREMIUM_DESC')}`,
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
      const onwer = await client.users.cache.get(message.author.id);

      const mss12 = await message.channel.send({ embeds: [content.embed], components: [content.component] }).catch(
        (e) => onwer.send({ content: `${language(guild, 'NOPERMS_SEND')}` })
      )

      collector.on('end', async message => {
        const helpMenu2 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId('help-menu')
              .setPlaceholder(`${language(guild, 'HELP_MENU_TURNEDOFF')}`)
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