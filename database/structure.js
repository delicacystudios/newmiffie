const mongoose = require('mongoose');
const config = require('../configs/config.js');
const chalk = require('chalk');

module.exports = async () => {
  await mongoose.connect(config.bot.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => console.log(
      chalk.greenBright.bgBlack(
        " [DB] Подключено к MongoDB "
      )
    ),

    (e) => console.log(
      chalk.redBright.bgBlack(' [DB] Произошла ошибка при подключении к MongoDB ')
    )
  )
}