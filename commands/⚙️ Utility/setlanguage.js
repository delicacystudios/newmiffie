const config = require('../../configs/config.js');
const { MessageEmbed } = require('discord.js');
const settingsSchema = require('../../database/settings');
const fs = require('fs');


const { Locale } = require("../../references/utils.js");
const i18n = require("i18n");

module.exports = {
  name: "setlang",
  aliases: ['setlanguage', 'sl'],
  description: 'Сменить язык бота',
  category: "Utility",
  usage: '[en / ru]',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });

    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} © Все права защищены`
    // // // //
    
    let ru = "ru";
    let en = "en";
    
    if (!args[0]) {
      const embedw = new MessageEmbed()
        .setColor(config.embeds.error)
        .setDescription('Вам нужно указать язык!')
      message.channel.send({ embeds: [embedw] })
    } else if (ru == args[0] || en == args[0]) {
      const languagesc = await settingsSchema.findOneAndUpdate({
        guildID: message.guild.id,
        language: args[0]
      })
      languagesc.save();

      const embed1 = new MessageEmbed()
        .setColor(color)
        .setDescription(`${args[0]} был успешно установлен!`)
      message.channel.send({ embeds: [embed1] })
    }
  }
}