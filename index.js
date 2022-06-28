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
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

const config = require('./configs/config.js');
const fs = require('fs');
const ascii = require('ascii-table');

const mongoose = require("mongoose");
const GuildSettings = require("./database/settings.js");
const Dashboard = require("./dashboard/dashboard.js");


//---[ Loading Events ]---//

fs.readdir("./events/", (err, files) => {
  if(err) console.log(err)
  let JSevents = files.filter(t => t.split(".").pop() === "js")

  JSevents.forEach(file => {
    let eventN = file.split(".")[0]
    console.log(`Loaded event: ${eventN}.js`)
    let event = require(`./events/${eventN}`)
    client.on(eventN, event.bind(null, client))     
  })
});

//////////////////////////////////////////

client.commands = new Collection();
client.aliases = new Collection();

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
       

////////////////////////////////////////////
////////////////////////////////////////////


client.on("ready", async () => {
  Dashboard(client);
  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }
});

////////////////////////////////////////////
/////////////////////


client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.content.includes("@here") || message.content.includes("@everyone")) return;
  const GuildSettings = require("./database/settings.js");
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

  const prefix = storedSettings.prefix
  if (prefix === null) prefix = config.chat.prefix
  
  if (message.mentions.has(client.user.id)) {
    const mention = new MessageEmbed()
      .setTitle(`Мой префикс — \`${prefix}\``)
      .setDescription(`Если вам нужна помощь по командам бота, напишите \`${prefix}help\``)
      .setFooter({ text: "Miffie ©️ Все права защищены."})
      .setColor(config.embeds.color)
    return message.reply({ embeds: [mention] })
  }
})

client.login(config.bot.token)

mongoose.connect(config.bot.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});