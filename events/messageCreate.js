const config = require('../configs/config.js');
const { MessageEmbed, Permissions, Collection } = require('discord.js')
const cooldowns = new Collection();
const profileModel = require("../database/profile");


module.exports = async (client, message) => {
  // // // // //
  const premSchema = require('../database/premium.js');
  const prem = await premSchema.findOne({ User: message.author.id });

  const pgSchema = require('../database/pg.js');
  const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

  const premuser = prem || guildPrem;
  const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
  // // // //

  if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
    return
  }

  if (message.author.bot) return false;

  const GuildSettings = require("../database/settings.js");
  let storedSettings = await GuildSettings.findOne({
    guildID: message.guild.id
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
    profileData = await profileModel.findOne({ serverID: message.guild.id });
    if (!profileData) {
      let profile = await profileModel.create({
        serverID: message.guild.id,
        botID: client.user.id,
        coins: 10,
        bank: 0
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
            () => timestamps.delete(message.author.id), cooldown, cmd.run(client, message, args)
          )
        }
      } else if (premuser) {
        try {
          cmd.run(client, message, args)
        } catch (err) {
          const occurederror = new MessageEmbed()
            .setColor(config.embeds.error)
            .setDescription(`Произошла ошибка при выполнении данной команды!
              Если вы считаете, что это баг, сообщите о нем используя \`${prefix}bugreport\``)
          message.channel.send({ embeds: [occurederror] })
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