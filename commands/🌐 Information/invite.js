const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../configs/config.js');

module.exports = {
  name: "invite",
  aliases: [],
  description: 'Пригласить бота на свой сервер',
  category: "Information",
  usage: '',
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const premuser = await premSchema.findOne({ User: message.author.id });
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} © Все права защищены`
    // // // //
    
    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`Пригласите ${client.user.username} на ваш сервер, и станьте одним из людей, кто получит Premium бесплатно))`)
      .setImage('https://media.discordapp.net/attachments/984299199967408163/994026105298223206/PicsArt_22-07-05_17-44-42-657.png')
      .setFooter({ text: `${namefooter}` })
    const invitebtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Пригласить')
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setStyle('LINK'),
      )
    message.reply({ embeds: [embed], components: [invitebtn] }).catch(
      (error) => console.log(`Ошибка: Невозможно отправить сообщение в канал`)
    )
  }
}