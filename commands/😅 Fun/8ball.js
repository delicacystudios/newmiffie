const { MessageEmbed } = require('discord.js');
const random = require('random');
const language = require('../../references/language')

module.exports = {
  name: "8ball",
  aliases: [],
  description: 'Получите ответ на любой вопрос',
  category: "Fun",
  usage: '[вопрос]',
  cooldown: 3,
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {
    const { guild }= message;
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });
    
    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });
    
    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username}` : `${client.user.username}`} ${language(guild, 'FOOTER')}`
    // // // //

    let answers = [
      `${language(guild, 'ANS1')}`,
      `${language(guild, 'ANS2')}`,
      `${language(guild, 'ANS3')}`,
      `${language(guild, 'ANS4')}`,
      `${language(guild, 'ANS5')}`,
      `${language(guild, 'ANS6')}`,
      `${language(guild, 'ANS7')}`,
      `${language(guild, 'ANS8')}`,
      `${language(guild, 'ANS9')}`,
      `${language(guild, 'ANS10')}`,
      `${language(guild, 'ANS11')}`,
      `${language(guild, 'ANS12')}`,
      `${language(guild, 'ANS13')}`,
      `${language(guild, 'ANS14')}`,
      `${language(guild, 'ANS15')}`,
      `${language(guild, 'ANS16')}`,
      `${language(guild, 'ANS17')}`,
      `${language(guild, 'ANS18')}`,
      `${language(guild, 'ANS19')}`,
      `${language(guild, 'ANS20')}`
    ]
    
    let response = random.int(0, answers.length - 1)
    let embed = new MessageEmbed()
      .setTitle(`${language(guild, 'ANS_8BALL')}`)
      .setColor(color)
      .setDescription(answers[response])
      .setFooter({ text: `${namefooter}` })
    message.reply({ embeds: [embed] })
  }
}