const { MessageEmbed } = require("discord.js");
const ownerid = "528930032823959562";
const config = ('../../configs/config.js');

module.exports = {
  name: "servers",
  description: "Показать все сервера",
  category: 'Owner',
  usage: "",

  run: async (client, message) => {
    if (message.author.id == ownerid) {

      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `\`${client.users.cache.size}\` ・ Участников \n` +
        `\`${client.guilds.cache.size}\` ・ Серверов \n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** ・ **${r.name}** \n> \`${r.memberCount}\` Пользователей \n> \`${r.id}\``)
          .slice(0, 10)
          .join("\n\n")

      let embed = new MessageEmbed()
        .setAuthor({ name: `Список серверов Miffie`})
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(`#a94dff`)
        .setFooter({ text: `Страница - ${page}/${Math.ceil(client.guilds.cache.size / 10)}` })
        .setDescription(description)

      let msg = await message.channel.send({ embeds: [embed]})

      await msg.react("⬅");
      await msg.react("❌");
      await msg.react("➡");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      )

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete()
          }
          
          if (!i0 || !i1) {
            return msg.delete()
          }

          description =
            `\`${client.users.cache.size}\` ・ Участников \n` +
            `\`${client.guilds.cache.size}\` ・ Серверов \n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map((r, i) => `**${i + 1}** ・ **${r.name}** \n> \`${r.memberCount}\` Пользователей \n> \`${r.id}\``)
              .slice(0, 10)
              .join("\n\n")

          embed
            .setFooter({ text: `Страница - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}` })
            .setDescription(description)
          msg.edit({ embeds: [embed]})
        }

        if (reaction._emoji.name === "➡") {
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 10) {
            return msg.delete();
          }
          
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `\`${client.users.cache.size}\` ・ Участников \n` +
            `\`${client.guilds.cache.size}\` ・ Серверов \n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map((r, i) => `**${i + 1}** ・ **${r.name}** \n> \`${r.memberCount}\` Пользователей \n> \`${r.id}\``)
              .slice(0, 10)
              .join("\n\n")

          embed
            .setFooter({ text: `Страница - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}` })
            .setDescription(description);
          msg.edit({ embeds: [embed] })
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }
        
        await reaction.users.remove(message.author.id);
      })
    } else {
      return
    }
  }
}