const { languages } = require('../../languages.json');
const { MessageEmbed } = require('discord.js');
const languageSchema = require('../../database/languages');
const { setLanguage } = require('../../references/language');
const language = require('../../references/language');

module.exports = {
  name: "setlang",
  aliases: ['setlanguage', 'sl'],
  description: 'Сменить язык бота',
  category: "Utility",
  usage: '[en / ru]',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    const {guild} = message;
    const targetLanguage = args[0].toLowerCase();
    
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'LANG_NOARGS')}`)
      message.channel.send({ embeds: [embed] })

    } else if (!languages.includes(targetLanguage)) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'LANG_NOTSUPPORTED')}`)
      message.channel.send({ embeds: [embed] })
      
    } else {
      setLanguage(guild, targetLanguage)
      
      const rurrr = await languageSchema.findOneAndUpdate({
        GuildID: guild.id,
      }, {
        GuildID: guild.id,
        Language: targetLanguage
      }, {
        upsert: true
      })

      rurrr.save()
      const emb2ed2 = new MessageEmbed()
        .setColor(client.config.embeds.color)
        .setDescription(`${language(guild, 'LANG_SEND')}`)
      message.channel.send({ embeds: [emb2ed2] })
    }
  }
}