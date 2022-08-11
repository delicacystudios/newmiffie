const backup = require("discord-backup");
backup.setStorageFolder(__dirname + "/backups/");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "create-backup",
  description: "Создать бэкап сервера",
  aliases: [],
  usage: [],
  category: "Addons",
  cooldown: 3,
  premium: true,
  
  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const settingsSchema = require('../../database/settings');
    const settt = await settingsSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const premstatus = `${premuser ? `👑 Miffie Premium` : `Miffie`}`
    // // // //

    let backupData = await backup.create(message.guild, {
      jsonBeautify: true,
      saveImages: "base64"
    });
    
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`Бэкап для сервера \`${message.guild.name}\` был создан!\n\`${client.prefix}load-backup\` ||${backupData.id}||`)
      .setFooter({ text: `Советуем не показывать этот код никому, ведь злоумышленники могут получить доступ к серверу!` })
    message.channel.send({ embeds: [embed] })
  }
}