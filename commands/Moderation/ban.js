const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  category: "Moderation",
  aliases: [],
  description: "Забанить пользователя",
  usage: "[пользоваель]",
  cooldown: 3,

  run: async (client, message, args) => {
    let Member = message.mentions.users.first();
    let Reason = args.slice(1).join(" ");
    let User = message.guild.members.cache.get(Member);

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Извините, но у вас недостаточно прав!`)
      message.channel.send({ embeds: [embed] })

    } else if (!Member) {
      const embed2 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Пожалуйста, укажите пользователя для бана!`)
      message.channel.send({ embeds: [embed2] })

    } else if (!message.guild.members.cache.get(Member.id)) {
      const embed22 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Данный пользователь не находится на сервере!`)
      message.channel.send({ embeds: [embed22] })

    } else if (Member.id === message.author.id) {
      const embed3 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Извините, но вы не можете забанить сами себя!`)
      message.channel.send({ embeds: [embed3] })

    } else if (Member.id === client.user.id) {
      const embed33 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Не баньте меня, пожалуйста :3`)
      message.channel.send({ embeds: [embed33] })

    } else if (Member.id === message.guild.owner.user.id) {
      const embed2223 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Вы не можете забанить владельца сервера!`)
      message.channel.send({ embeds: [embed2223] })

    } else if (!User.bannable) {
      const embed8 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Не удалось забанить данного пользователя!`)
      message.channel.send({ embeds: [embed8] })

    } else {
      try {
        setTimeout(function() {
          User.ban({ reason: `${Reason || "Без причины"}` });
        }, 2000);
        let embed = new MessageEmbed()
          .setColor(client.config.embeds.color)
          .setTitle(`Участник забанен!`)
          .addFields(
            {
              name: ` Модератор: `, 
              value: `<@${message.author.id}> | \`(${message.author.id})\``
            },
            {
              name: ` Нарушитель: `, 
              value: `<@${Member.id}> | \`(${Member.id})\``
            },
            {
              name: ` Причина бана: `, 
              value: `\`${Reason || "Причина не указана!"}\``
            },
          )
        
        if (User && Member.bot === false) {
          const raba = new MessageEmbed()
            .setColor(client.config.embeds.color)
            .setTitle(`Вы были забанены в ${message.guild.name}!`)
            .addFields(
              {
                name: `По причине:`,
                value: `${Reason || "Причина не указана"}`
              }
            )
          Member.send({ embeds: [raba] })
          message.channel.send({ embeds: [embed] });
        }
      } catch (error) {
        const ewewe = new MessageEmbed()
          .setColor(client.config.embeds.error)
          .setDescription(`У бота не получилось забанить данного пользователя. Возможно, роль данного пользователя выше, чем роль бота, или роль бота ниже чем данный участник `)
        message.channel.send({ embeds: [ewewe] }).catch((e) => console.log(e));
      }
    }
  }
}