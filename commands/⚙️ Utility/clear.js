const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ["purge", "очистить"],
  category: "Utility",
  description: "Очистка чата",  
  usage: "[количество]",
  cooldown: 3,
  premium: false,
  
  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    // // // // 
    
    if (message.deletable) {
      message.delete()
    }
    
    const noperms = new MessageEmbed()
      .setColor(config.embeds.error)
      .setDescription(`У бота недостаточно прав! Пожалуйста, проверьте наличие права \`MANAGE_MESSAGES\``)
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) 
      return message.channel.send({ embeds: [noperms] })
    
    if (!args[0]) 
      return message.channel.send({ content: "Укажите количество сообщений которое хотите удалить" });

    const noperms2 = new MessageEmbed()
      .setColor(client.config.embeds.error)
      .setDescription(`У вас недостаточно прав!`)
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) 
      return message.channel.send({ embeds: [noperms2] }) 

    const count = new MessageEmbed()
      .setColor(client.config.embeds.error)
      .setDescription(`Сообщение не содержит числа!`)
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.channel.send({embeds: [count]})
    }

    let embed = new MessageEmbed()
      .setColor(client.config.embeds.error)
      .setDescription(`Ваше число превышает лимит в 100 сообщений`)
    if(args[0] > 100) 
      return message.channel.send({ embeds: [embed] }) 
    
    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = args[0];
    } else {
        deleteAmount = parseInt(args[0]);
    }
    
    if(message.mentions.users.size === 1) {
      message.channel.messages.fetch({
        limit: 100
      }).then((messages) => {
        let target = message.mentions.members.first();
        let embed1 = new MessageEmbed()
          .setColor(color)
          .setDescription(`Удалено ${deleteAmount} сообщений`)
        const botMessages = [];
        messages.filter(m => m.author.id === target.id).forEach(msg => botMessages.push(msg))
        message.channel.bulkDelete(deleteAmount, botMessages).then(() => {
          message.channel.send({embeds: [embed1]});
        })
      })
    }
    
    if(message.mentions.users.size === 0) {
      message.channel.messages.fetch({
        limit: 100
      }).then((messages) => {
        message.channel.bulkDelete(deleteAmount, true)
        const embed1 = new MessageEmbed()
         .setColor(color)
         .setDescription(`Удалено ${deleteAmount} сообщений`)
        message.channel.send({ embeds: [embed1] })
          .catch(err => message.channel.send(`Что-то пошло не так...`));
      })
    }
  }
}