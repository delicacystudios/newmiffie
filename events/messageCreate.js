const config = require('../configs/config.js');
const { MessageEmbed, Permissions } = require('discord.js')

const mongoose = require("mongoose");
const Dashboard = require("../dashboard/dashboard.js");

module.exports = async (client, message) => {
  if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
    return
  }

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

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  if (cmd) cmd.run(client, message, args);
}