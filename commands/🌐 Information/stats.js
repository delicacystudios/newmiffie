const { MessageEmbed } = require('discord.js');
const mmnt = require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");
const config = require('../../configs/config.js');

module.exports = {
  name: 'stats',
  description: 'Статистика',
  category: 'Information',
  aliases: ['ping', 'statistics', 'bot'],
  usage: "",
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} © Все права защищены`
    
    if (!args[0]) {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(message.client.uptime)
          .format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed()
          .setColor(color)
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
              name: "Shard",
              value: `┕\`${message.guild.shard.id + 1}\``,
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
          .setFooter({ text: `${namefooter}` })
        message.channel.send({ embeds: [embed] })
          .then((message) => {
            setInterval(function() {
              const { version } = require("discord.js");
              cpuStat.usagePercent(async function(err, percent, seconds) {
                if (err) {
                  return console.log(err);
                }
                const duration = moment
                  .duration(message.client.uptime)
                  .format(" D[d], H[h], m[m]");

                const embed = new MessageEmbed()
                  .setColor(color)
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
                      name: "Shard",
                      value: `┕\`${message.guild.shard.id + 1}\``,
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
                  .setFooter({ text: `${namefooter}` })
                message.edit({ embeds: [embed] })
              })
            }, 500)
          })
      })
    }
  }
}