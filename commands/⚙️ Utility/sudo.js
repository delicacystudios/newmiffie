const { MessageEmbed } = require('discord.js');
const language = require('../../references/language');

module.exports = {
  name: "sudo",
  aliases: [],
  description: 'Создается вебхук отправки сообщения от другого пользователя',
  category: "Utility",
  usage: '[пользователь] [сообщение]',
  cooldown: 3,
  premium: false,
  
  run: async (client, message, args) => {
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    
    if (!user) {
      const mem = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`${language(guild, 'SUDO_IND')}`)
      message.channel.send({ embeds: [mem] })
    } else {
      const webhook = await message.channel.createWebhook(user.displayName, {
        avatar: user.user.displayAvatarURL(),
        channel: message.channel.id
      });
      
      await webhook.send(args.slice(1).join(" ")).then(() => {
        webhook.delete();
      });
    }
  }
};