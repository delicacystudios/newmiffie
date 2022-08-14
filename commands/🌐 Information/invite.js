const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const language = require('../../references/language')

module.exports = {
  name: "invite",
  aliases: [],
  description: `Получить ссылку на приглашение мифи`,
  category: "Information",
  usage: '',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    
    const { guild } = message
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });

    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const premuser = prem || guildPrem;
    const color = `${premuser ? client.config.embeds.premium : client.config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} ${language(guild, 'FOOTER')}`
    // // // //

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${language(guild, 'INVITE_DESCRIPTION1')} ${client.user.username} ${language(guild, 'INVITE_DESCRIPTION2')}`)
      .setImage('https://media.discordapp.net/attachments/984299199967408163/1006991520324403271/PicsArt_22-08-10_00-29-34-209.png')
      .setFooter({ text: `${namefooter}` })
    const invitebtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel(`${language(guild, 'INVITE')}`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setStyle('LINK'),
      )
    message.reply({ embeds: [embed], components: [invitebtn] }).catch(
      (error) => console.log(`Ошибка: Невозможно отправить сообщение в канал`)
    )
  }
}

// ${language(guild, 'INVITE')}