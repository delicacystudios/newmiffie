const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "Moderation",
  aliases: [],
  description: "Кикнуть участника",
  usage: "[пользователь]",

  run: async (client, message, args) => {
    let Member = message.mentions.users.first();
    let Reason = args.slice(1).join(" ");
    let User = message.guild.members.cache.get(Member);

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Извините, но у вас недостаточно прав!`)
      message.channel.send({ embeds: [embed] })

    } else if (!Member) {
      const emb2ed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Пожалуйста, упомяните пользователя которого вы хотите кикнуть`)
      message.channel.send({ embeds: [emb2ed] })

    } if (!message.guild.members.cache.get(Member.id)) {
      const emb2ed2 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Данный пользователь не находится на данном сервере!`)
      message.channel.send({ embeds: [emb2ed2] })

    } else if (Member.id === message.author.id) {
      const m3b2ed2 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Вы не можете кикнуть самого(-му) себя`)
      message.channel.send({ embeds: [m3b2ed2] })

    } else if (Member.id === client.user.id) {
      const m3b2ed22 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Не кикайте меня, пожалуйста :3`)
      message.channel.send({ embeds: [m3b2ed22] })

    } else if (Member.id === message.guild.owner.user.id) {
      const embed2223 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Вы не можете кикнуть владельца сервера!`)
      message.channel.send({ embeds: [embed2223] })

    } else if (!User.kickable) {
      const embed8 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Не удалось кикнуть данного пользователя!`)
      message.channel.send({ embeds: [embed8] })
    } else {
      try {
        setTimeout(function() {
          User.ban({ reason: `${Reason || "Без причины"}` });
        }, 2000);
        let embed = new MessageEmbed()
          .setColor(client.config.embeds.color)
          .setTitle(`Участник кикнут!`)
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
              name: ` Причина кика: `, 
              value: `\`${Reason || "Причина не указана!"}\``
            },
          )
        
        if (User && Member.bot === false) {
          const raba = new MessageEmbed()
            .setColor(client.config.embeds.color)
            .setTitle(`Вы были кикнуты из ${message.guild.name}!`)
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
          .setDescription(`У бота не получилось кикнуть данного пользователя. Возможно, роль данного пользователя выше, чем роль бота, или роль бота ниже чем данный участник `)
        message.channel.send({ embeds: [ewewe] }).catch((e) => console.log(e));
      }
    }
  }
}