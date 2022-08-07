# 🌸 Miffie 🌸
#### Miffie — это новый и универсальный дискорд бот, созданый для упрощения управления серверами в дискорде, а так-же, для того чтобы дать людям хороший инструмент для различных нужд

<div align="centre"><img src="https://media.discordapp.net/attachments/984299199967408163/991358811740835901/Screenshot_2022-06-28_09-05-14.png"></div>

## Для создания команды
```javascript
const { MessageEmbed } = require('discord.js'); // Не обязательно
const config = require('путь');

// // Нужно для изменения цвета для премиум-пользователей // //
const premSchema = require('../../database/premium.js');
const premuser = await premSchema.findOne({ User: message.author.id });
const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
// // // //

module.exports = {
  name: '', // Название команды
  description: '', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '', // Оставьте пустым, если не требуются аргументы
  category: '', // Категория
  premium: false, // true - премиум команда / false - не премиум команда

  run: async (client, message, args) {
    // ...
  }
}
```

## Конфиг
```javascript
module.exports = {
  bot: {
    token: '', // Токен бота
    id: '', // Айди бота
    db: '', // MongoDB Database
    devID: ['', ''], // Разработчики бота
  },
  
  chat: {
    prefix: 'm/', // Префикс бота
    server: 'https://discord.gg/nacafe' // Сервер поддержки
  },
  
  embeds: { // Можете изменить при необходимости
    color: '#ff8bce',
    premium: '#ffd173',
    developer: '#23272A',
    error: '#fe8780'
  },

  keys: {
    CatKey: '' // Токен CatAPI
  },

  port: 25565, // Порт сайта (если вы на localhost)
  CustomDomain: true, // false - localhost / true - домен
  domain: '', // Домен сайта
  clientSecret: '' // Client Secret бота
}
```

## 💘 Credits
— [**DSvinka**](https://github.com/DSvinka)