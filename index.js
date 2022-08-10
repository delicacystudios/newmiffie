const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

//const config = require('./configs/config.js');
//const emojies = require('./configs/emoji.js');
const GuildSettings = require("./database/settings.js");
const chalk = require('chalk');

const fs = require('fs');

//////////////////////////////////////////

client.queue = new Map()
const { Player } = require('discord-player');

//////////////////////////////////////////

// -------------- //
const path = require("path");
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['ru', 'en'],
  directory: path.join(__dirname, '.', 'locales')
})
// -------------- //

//////////////////////////////////////////

client.commands = new Collection();
client.aliases = new Collection();
client.config = require('./configs/config.js');
client.emotes = require('./configs/emoji.js');

//////////////////////////////////////////

fs.readdirSync("./commands/").forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
  for (let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    if (pull.name) {
      client.commands.set(pull.name, pull);
    } else {
      console.log(`❌: ${file}`)
      continue;
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
  }
})

fs.readdirSync('./events/').forEach(dirs => {
  const events = fs.readdirSync(`./events/${dirs}`).filter(files => files.endsWith('.js'))
  for (const file of events) {
    const event = require(`./events/${dirs}/${file}`)
    client.on(file.split(".")[0], event.bind(null, client))
  }
})

//////////////////////////////////////////
//////////////////////////////////////////

client.on('messageCreate', async (message) => {
  let storedSettings = await GuildSettings.findOne({
    guildID: message.guild.id
  })

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

  let prefix = client.config.chat.prefix;
  if (storedSettings && storedSettings.prefix) {
    prefix = storedSettings.prefix;
  }

  client.prefix = prefix;

  if (message.author.bot) return;
  if (message.content.includes("@here") || message.content.includes("@everyone")) return;
  // // // // //
  const premSchema = require('./database/premium.js');
  const premuser = await premSchema.findOne({ User: message.author.id });
  const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
  const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
  // // // //

  if (message.mentions.has(client.user.id) && !message.mentions.has(client.user.id) === message.content) {
    const mention = new MessageEmbed()
      .setTitle(`Мой префикс — \`${prefix}\``)
      .setDescription(`Если вам нужна помощь по командам бота, напишите \`${prefix}help\``)
      .setFooter({ text: `${premstatus} ©️ Все права защищены.` })
      .setColor(color)
    return message.reply({ embeds: [mention] })
  }
})

//////////////////////////////////////////

client.login(client.config.bot.token)

//////////////////////////////////////////
//////////////////////////////////////////

process.on('unhandledRejection', (e) => {
  console.log(chalk.redBright.bgBlack('[API] Произошла неизвестная ошибка'), e)
});