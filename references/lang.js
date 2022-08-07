const files = require('../files.js')
const path = require('path');

module.exports = {
  getLocale: async (lang_code = "ru") => {
    try {
      const file = await files.readFile(`/locales/${lang_code}.json`);
      return JSON.parse(file)
    } catch (err) {
      console.log(err);
    }
  },
  getLocaleCodes: async () => {
    try {
      const data = await files.readDirectory('/locales/');
      let lang_files = data.filter(file => file.endsWith(".json"))
      let lang_codes = lang_files.map(filename => path.parse(filename).name)
      return lang_codes
    } catch (err) {
      console.log(err);
    }
  }
}