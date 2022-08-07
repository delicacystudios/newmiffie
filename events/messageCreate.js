const config = require('../configs/config.js');
const { MessageEmbed, Permissions, Collection } = require('discord.js')


module.exports = async (client, message) => {
  // // // // //
  const premSchema = require('../database/premium.js');
  const premuser = await premSchema.findOne({ User: message.author.id });
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
      guildID: message.guild.id
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

  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd =
    client.commands.get(command) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  // // // // - Premium - // // // //
  if (command.premium && !(await premSchema.findOne({ User: message.author.id }))) {
    const noPremium = new MessageEmbed()
      .setColor(config.embeds.error)
      .setDescription('Извините, но вам нужно иметь премиум для использования данной команды!')
    message.channel.send({ embeds: [noPremium] })
    
  } else {
    if (cmd) cmd.run(client, message, args);
  }
}