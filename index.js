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

const config = require('./configs/config.js');

const mongoose = require("mongoose");
const GuildSettings = require("./database/settings.js");
const chalk = require('chalk');

const fs = require('fs');
const ascii = require('ascii-table');

//////////////////////////////////////////
//////////////////////////////////////////

// -------------- //
const path = require("path");
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['ru', 'en'],
  directory: path.join(__dirname, '.', 'locales')
})
// ---------------- //

fs.readdir("./events/", (err, files) => {
  if (err) console.log(err)
  let JSevents = files.filter(t => t.split(".").pop() === "js")

  JSevents.forEach(file => {
    let eventN = file.split(".")[0]
    let event = require(`./events/${eventN}`)  
    client.on(eventN, event.bind(null, client))
  })
});

//////////////////////////////////////////

//////////////////////////////////////////

client.commands = new Collection();
client.aliases = new Collection();
client.voiceGenerator = new Collection();

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

fs.readdirSync("./commands/").forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
  for (let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    if (pull.name) {
      client.commands.set(pull.name, pull);
      table.addRow(file, '✅');
    } else {
      table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
      continue;
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
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

  let prefix = config.chat.prefix;
  if (storedSettings && storedSettings.prefix) {
    prefix = storedSettings.prefix;
  }

  if (message.author.bot) return;
  if (message.content.includes("@here") || message.content.includes("@everyone")) return;
  // // // // //
  const premSchema = require('./database/premium.js');
  const premuser = await premSchema.findOne({ User: message.author.id });
  const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
  const premstatus = `${premuser ? `Miffie Premium` : `Miffie`}`
  // // // //

  if (message.mentions.has(client.user.id)) {
    const mention = new MessageEmbed()
      .setTitle(`Мой префикс — \`${prefix}\``)
      .setDescription(`Если вам нужна помощь по командам бота, напишите \`${prefix}help\``)
      .setFooter({ text: `${premstatus} ©️ Все права защищены.` })
      .setColor(color)
    return message.reply({ embeds: [mention] })
  }
})

//////////////////////////////////////////

client.login(config.bot.token)

//////////////////////////////////////////
//////////////////////////////////////////

process.on('unhandledRejection', () => {
  new Promise(async (_, reject) => setTimeout(() =>
    reject({
      error: chalk.redBright.bgBlack(' [API] Произошла неизвестная ошибка '),
    }), 1000)
  ).catch((e) => console.log('ошибка с ошибкой ))'))
});