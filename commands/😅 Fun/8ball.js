const { MessageEmbed } = require('discord.js');
const config = require('../../configs/config.js');
const random = require('random');

module.exports = {
  name: "8ball",
  aliases: [],
  description: 'Получите ответ на любой вопрос',
  category: "Fun",
  usage: '[вопрос]',
  permissions: ["SEND_MESSAGES"],

  run: async (client, message, args) => {

    let answers = [
      'Я вижу это в позитивном настроении', 
      'Спроси позже)', 
      'Лучше тебе не знать', 
      'Не могу ответить сейчас', 
      'Сосредоточьтесь и повторите вопрос', 
      'Не считается', 
      'Это точно', 
      'Это решительно так', 
      'Возможно :3', 
      'Мой ответ - нет', 
      'Мои ресурсы говорят - нет', 
      'Не такой уж и перспективный вопрос', 
      'Перспектива хорошая', 
      'Ответ неуверенный, попробуйте еще раз', 
      'Знаки указывают на положительный ответ', 
      'Очень сомнительно', 
      'Не знаю', 
      'Да', 
      'Да, безусловно', 
      'Возможно ты к этому относишься :3'
    ]
    
    let response = random.int(0, answers.length - 1)
    let embed = new MessageEmbed()
      .setTitle('8Ball ответчает:')
      .setColor(config.embeds.color)
      .setDescription(answers[response])
    message.reply({ embeds: [embed] })
  }
}