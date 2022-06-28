const { MessageEmbed } = require('discord.js');
const mmnt = require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");
const config = require('../../configs/config.js');

module.exports = {
  name: 'stats',
  descritpion: 'Активный статус бота',
  category: 'Information',
  aliases: ['ping', 'statistics', 'bot'],
  usage: "",

  run: async (client, message, args) => {
    if(!args[0]) {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(message.client.uptime)
          .format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed()
          .setColor(config.embeds.color)
          .setTitle(`Статистика`)
          .addFields(
            {
                name: "Ping",
                value: `┕\`${Math.round(client.ws.ping)}ms\``,
                inline: true,
            },
            {
                name: "Uptime",
                value: `┕\`${duration}\``,
                inline: true,
            },
            {
                name: "Memory",
                value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                  2
                )}mb\``,
                inline: true,
            }
          )

          .addFields(
            {
                name: "Users",
                value: `┕\`${client.users.cache.size}\``,
                inline: true,
            },
            {
                name: "API Latency",
                value: `┕\`${message.client.ws.ping}ms\``,
                inline: true,
            }
          )
      
          .addFields(
            {
                name: "Version",
                value: `┕\`v${require("../../package.json").version}\``,
                inline: true,
            },
            {
                name: "Discord.js",
                value: `┕\`v${version}\``,
                inline: true,
            },
            {
                name: "NodeJS",
                value: `┕\`${process.version}\``,
                inline: true,
            }
          )
        message.channel.send({ embeds: [embed] })
        .then((message) => {
          setInterval(function () {
            const { version } = require("discord.js");
            cpuStat.usagePercent(async function (err, percent, seconds) {
              if (err) {
                return console.log(err);
              }
              const duration = moment
                .duration(message.client.uptime)
                .format(" D[d], H[h], m[m]");

              const embed = new MessageEmbed()
                .setColor(config.embeds.color)
                .setTitle(`Статистика`)
                .addFields(
                  {
                      name: "Ping",
                      value: `┕\`${Math.round(client.ws.ping)}ms\``,
                      inline: true,
                  },
                  {
                      name: "Uptime",
                      value: `┕\`${duration}\``,
                      inline: true,
                  },
                  {
                      name: "Memory",
                      value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                        2
                      )}mb\``,
                      inline: true,
                  }
                )

                .addFields(
                  {
                      name: "Users",
                      value: `┕\`${client.users.cache.size}\``,
                      inline: true,
                  },
                  {
                      name: "API Latency",
                      value: `┕\`${message.client.ws.ping}ms\``,
                      inline: true,
                  }
                )
      
                .addFields(
                  {
                      name: "Version",
                      value: `┕\`v${require("../../package.json").version}\``,
                      inline: true,
                  },
                  {
                      name: "Discord.js",
                      value: `┕\`v${version}\``,
                      inline: true,
                  },
                  {
                      name: "NodeJS",
                      value: `┕\`${process.version}\``,
                      inline: true,
                  }
                )
              message.edit({ embeds: [embed] })
            })
          }, 500)
        })
      })
    }
  }
}