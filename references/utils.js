let config;
try {
  config = require("../configs/config.js");
} catch (error) {
  config = null;
}
const schema = require('../database/settings')

exports.Locale = (config ? config.chat.lang : process.env.LOCALE) || "en";