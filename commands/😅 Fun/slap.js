const { MessageEmbed } = require("discord.js");
const slaps = [
  "https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif",
  "https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif",
  "https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
  "https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif",
  "https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif",
  "https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif",
  "https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif",
  "https://media1.tenor.com/images/8b80166ce48c9c198951361715a90696/tenor.gif",
  "https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif",
  "https://media1.tenor.com/images/4ec47d7b87a9ce093642fc8a3c2969e7/tenor.gif"
];

module.exports = {
  name: "slap",
  description: "Ударить кого-либо",
  aliases: [],
  category: "Fun",
  cooldown: 3,
  usage: "<пользователь>",
  
  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    // // // //
    
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    
    if (!user) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription('Ой-ой, кажется вы не указали человека')
      message.channel.send({ embeds: [embed] })
    } else {
      const embed2 = new MessageEmbed()
        .setColor(color)
        .setImage(slaps[Math.floor(Math.random() * slaps.length)])
        .setFooter({ text: `${message.author.username} ударил(-а) ${user.user.username}` })
      message.channel.send({ embeds: [embed2] })
    }
  }
}