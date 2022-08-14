const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: [],
  category: "Moderation",
  description: "Mute A User!",
  usage: "Mute <Mention User> | <Reason>",
  run: async (client, message, args) => {
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;
    let Reason = args.slice(1).join(" ");

    if (!message.member.permissions.has("MANAGE_SERVER")) {
      const embed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Извините, но у вас недостаточно прав!`)
      message.channel.send({ embeds: [embed] })

    } else if (!Member) {
      const emb2ed = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Пожалуйста, упомяните пользователя которого вы хотите кикнуть`)
      message.channel.send({ embeds: [emb2ed] })

    } else if (!Role) {
      const emb2ed2 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`Пожалуйста, создайте роль с названием "Muted"`)
      message.channel.send({ embeds: [emb2ed2] })

    } else if (Member.roles.cache.has(Role)) {
      const emb2ed22 = new MessageEmbed()
        .setColor(client.config.embeds.error)
        .setDescription(`<@${Member.id}> уже был замьючен!`)
      message.channel.send({ embeds: [emb2ed22] })
    }

    let Embed = new MessageEmbed()
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
    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send({ embeds: [Embed] });
    } else {
      return message.channel.send(`Something Went Wrong, Try Again Later!`);
    }

    //End
  }
};