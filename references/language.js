const lang = require('../languages.json');
const languageSchema = require('../database/languages');

const guildLanguages = {}

const loadLanguages = async (client) => {
  try {
    for (const guild of client.guilds.cache) {
      const guildId = guild[0]
      const result = await languageSchema.findOne({
        GuildID: guildId
      })
      guildLanguages[guildId] = result ? result.Language : 'en'
    }
  } catch (err) {
    console.log(err)
  }
}

const setLanguage = (guild, language) => {
  guildLanguages[guild.id] = language.toLowerCase()
}
module.exports = (guild, textId) => {
  if (!lang.translations[textId]) {
    throw new Error('Unknown text')
  }

  const selectedLanguage = guildLanguages[guild.id]
  return lang.translations[textId][selectedLanguage]
}
module.exports.loadLanguages = loadLanguages;
module.exports.setLanguage = setLanguage;