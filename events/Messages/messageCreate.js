const config = require('../../configs/config.js');
const { MessageEmbed, Permissions, Collection } = require('discord.js')
const cooldowns = new Collection();

const profileModel = require("../../database/profile");
const GuildSettings = require("../../database/settings.js");
const BlackListSchema = require('../../database/blacklist.js');
const commandsSchema = require('../../database/commands.js');

const languageSchema = require('../../database/languages');
const { setLanguage } = require('../../references/language');


module.exports = async (client, message) => {
  // // // // //
  const premSchema = require('../../database/premium.js');
  const prem = await premSchema.findOne({ User: message.author.id });

  const pgSchema = require('../../database/pg.js');
  const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

  const premuser = prem || guildPrem;
  const color = `${premuser ? config.embeds.premium : config.embeds.color}`;

  const blacklisted = await BlackListSchema.findOne({
    Server: message.guild.id
  });

  // // // //
  
  const { guild } = message;
  const data2323 = await languageSchema.findOne({
    GuildID: guild.id
  })

  if (!data2323) {
    setLanguage(guild, client.config.bot.language)
    const lala = new languageSchema({
      GuildID: guild.id,
      Language: client.config.bot.language
    })

    lala.save()
    
  } else {
    await languageSchema.findOne({
      GuildID: guild.id
    })
  }

  if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
    return
  }

  if (message.author.bot) return;
  let storedSettings = await GuildSettings.findOne({
    guildID: message.guild.id
  });

  let comds = await commandsSchema.findOne({
    GuildID: message.guild.id
  });

  if (!storedSettings) {
    const newSettings = new GuildSettings({
      guildID: message.guild.id,
      language: "en"
    });

    try {
      await newSettings.save()
    } catch (e) {
      console.log(e)
      throw error
    }

    storedSettings = await GuildSettings.findOne({ guildID: message.guild.id })
  }

  let prefix = config.chat.prefix;
  if (storedSettings && storedSettings.prefix) {
    prefix = storedSettings.prefix;
  }

  let profileData;
  try {
    profileData = await profileModel.findOne({ UserID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        UserID: message.author.id,
        GuildID: message.guild.id,
        MiCoins: 1000,
        Bank: 0
      })

      profile.save()
    }
  } catch (err) {
    console.log(err);
  }

  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd =
    client.commands.get(command) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  // // // // - Premium - // // // //
  if (cmd) {
    if (blacklisted) {
      const black = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setTitle('Ваш сервер был заблокирован разработчиками бота!')
        .setDescription(`Если вы считаете, что это было сделано по ошибке, пожалуйста, обратитесь к нам на нашем [сервере поддержки](${client.config.chat.server}), или лично к разработчику - \`${client.config.bot.devID}\` NateAles#0003`)
        .setImage('https://media.discordapp.net/attachments/984299199967408163/1006991520592830474/PicsArt_22-08-10_00-28-22-215.png')
      message.channel.send({ embeds: [black] })
    } else {
      if (command.premium) { //!premuser || command.premium && !guildPrem)
        if (!guildPrem, async (data, err) => {
          const expiredprem = new MessageEmbed()
            .setColor(config.embeds.error)
            .setDescription('Ваш премиум закончился!')

          const noPremium = new MessageEmbed()
            .setColor(config.embeds.error)
            .setDescription('Извините, но вам нужно иметь премиум для использования данной команды!')

          if (!data)
            return message.channel.send({ embeds: [noPremium] });

          if (!data.Permanent && Date.now() > data.Expire) {
            data.delete()
            return message.channel.send({ embeds: [expiredprem] });
          }
        })

          if (!prem) {
            const noPremium2 = new MessageEmbed()
              .setColor(config.embeds.error)
              .setDescription('Извините, но вам нужно иметь премиум для использования данной команды!')
            message.channel.send({ embeds: [noPremium2] });
          } else if (!guildPrem) {
            const noPremium2 = new MessageEmbed()
              .setColor(config.embeds.error)
              .setDescription('Извините, но у вашему серверу нужен премиум для использования данной команды!')
            message.channel.send({ embeds: [noPremium2] });
          }
      } else {
        // // // // - Cooldowns - // // // //

        if (!cooldowns.has(cmd.name)) {
          cooldowns.set(cmd.name, new Collection());
        }

        const nowtime = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldown = (cmd.cooldown) * 1000;
        if (!premuser) {
          if (timestamps.has(message.author.id)) {
            const expire = timestamps.get(message.author.id) + cooldown;

            if (nowtime < expire) {
              const timeleft = (expire - nowtime) / 1000;
              const cooldownembed = new MessageEmbed()
                .setColor(config.embeds.error)
                .setDescription(`Вам нужно подождать \`${timeleft.toFixed()}\` cек., прежде чем использовать команду снова!`)
                .setFooter({ text: `Пользователи & Сервера имеющие премиум не имеют кулдаунов!` })
              message.channel.send({ embeds: [cooldownembed] })
            }
          } else {
            timestamps.set(message.author.id, nowtime);
            setTimeout(
              () => timestamps.delete(message.author.id), cooldown, cmd.run(client, message, args, profileData)
            )
          }
        } else if (premuser) {
          try {
            const check = comds;
            if (check) {
              if (check.Commands.includes(cmd.name)) {
                const mom = new MessageEmbed()
                  .setColor(client.config.embeds.error)
                  .setDescription('Данная команда была отключена администратором сервера!')
                message.channel.send({ embeds: [mom] })
              } else {
                cmd.run(client, message, args, profileData)
              }
            } else {
              cmd.run(client, message, args, profileData)
            }
          } catch (err) {
            const occurederror = new MessageEmbed()
              .setColor(config.embeds.error)
              .setDescription(`Произошла ошибка при выполнении данной команды!
              Если вы считаете, что это баг, сообщите о нем используя \`${prefix}bugreport\``)
            message.channel.send({ embeds: [occurederror] })
            console.log(err)
          }
        }
      }
    }
  } else {
    const nocommand = new MessageEmbed()
      .setColor(config.embeds.error)
      .setDescription('Данная команда не может быть исполнена, так-как такой команды не существует!')
    message.channel.send({ embeds: [nocommand] })
  }
}