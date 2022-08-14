const { MessageEmbed } = require('discord.js');
const language = require('../../references/language');

module.exports = {
  name: 'server',
  aliases: ["serv", "guild", "сервер"],
  category: "Utility",
  description: "Информация о сервере",
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    //-- Prefix Stuff --//
    const GuildSettings = require("../../database/settings.js");
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

    let prefix = client.config.chat.prefix;
    if (storedSettings && storedSettings.prefix) {
      prefix = storedSettings.prefix;
    }
    
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    // // // //   
    
    //-- Code --//
    const guild = message.guild;
    
    let ava;
    if (premuser) {
      ava = guild.iconURL({ dynamic: true, size: 4096 })
    } else {
      ava = guild.iconURL({ dynamic: false, size: 1024 })
    }
    
    let avatar = ava ? ava : `https://media.discordapp.net/attachments/984299199967408163/986522852146679808/logo.png`;
    
    if (!args[0]) {
      let verifLevels = {
        NONE: `${language(guild, 'SERVER_LEVEL1')}`,
        LOW: `${language(guild, 'SERVER_LEVEL2')}`,
        MEDIUM: `${language(guild, 'SERVER_LEVEL3')}`,
        HIGH: `${language(guild, 'SERVER_LEVEL4')}`,
        VERY_HIGH: `${language(guild, 'SERVER_LEVEL5')}`,
      };

      const serverembed = new MessageEmbed()
        .setAuthor({ name: `${language(guild, 'SERVER_AUTHOR')} ${message.guild.name}` })
        .setThumbnail(avatar)
        .setColor(color)
        .addFields(
          {
            name: `${language(guild, 'SERVER_SN')}`,
            value: `
            > ${language(guild, 'SERVER_S1')}: \`${message.guild.memberCount}\`
            > ${language(guild, 'SERVER_S2')}: \`${message.guild.members.cache.filter((member) => !member.user.bot).size}\`
            > ${language(guild, 'SERVER_S3')}: \`${message.guild.members.cache.filter((member) => member.user.bot).size}\` \n_ _`,
          },
          {
            name: `${language(guild, 'SERVER_CN')}`,
            value: `
            > ${language(guild, 'SERVER_C1')} \`${message.guild.channels.cache.size}\` 
            > ${language(guild, 'SERVER_C2')} \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\` 
            > ${language(guild, 'SERVER_C3')} \`${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}\` \n_ _`,
          },
          {
            name: `${language(guild, 'SERVER_ON')}`,
            value: `
            > ${language(guild, 'SERVER_O1')} \`${message.member.joinedAt.toLocaleString()}\` 
            > ${language(guild, 'SERVER_O2')} \`${message.guild.createdAt.toLocaleString()}\`
            > ${language(guild, 'SERVER_O3')} \`${verifLevels[message.guild.verificationLevel]}\`
            > ${language(guild, 'SERVER_O4')} <@${message.guild.ownerId}> \n_ _`
          }
        )
        .setFooter({ text: `${language(guild, 'SERVER_F')} ${prefix}server avatar` })
      message.channel.send({ embeds: [serverembed] })
    }
    
    if (args.join(" ").toLowerCase() === 'avatar') {
      const embed = new MessageEmbed()
        .setColor(color)
        .setImage(avatar)
      message.channel.send({embeds: [embed]})
    }
  }
}