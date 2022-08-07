# 🌸 Miffie 🌸
#### Miffie — это новый и универсальный дискорд бот, созданый для упрощения управления серверами в дискорде, а так-же, для того чтобы дать людям хороший инструмент для различных нужд

<div align="centre"><img src="https://media.discordapp.net/attachments/984299199967408163/994026105298223206/PicsArt_22-07-05_17-44-42-657.png"></div>

## Установка кода
```
1: $ git clone https://github.com/delicacystudios/newmiffie.git
2: $ cd newmiffie
3: $ bash load.sh
```

## Для создания команды
```javascript
const { MessageEmbed } = require('discord.js'); // Необязательно
const config = require('../../configs/config.js');

module.exports = {
  name: '', // Название команды
  description: '', // Описание команды
  aliases: [''], // Прозвища команд (подкоманды)
  usage: '', // Оставьте пустым, если не требуются аргументы
  category: '', // Категория
  cooldown: 3,
  premium: false, // true - премиум команда / false - не премиум команда

  run: async (client, message, args) {
    // // Нужно для изменения цвета для премиум-пользователей // //
    const premSchema = require('../../database/premium.js');
    const premuser = await premSchema.findOne({ User: message.author.id });
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    // // // //
  
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
