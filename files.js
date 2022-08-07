var fs = require("fs/promises");

module.exports = {
  readFile: async (path) => {
    try {
      const file = await fs.readFile(__dirname + path, { encoding: 'utf8' });
      return file
    } catch (err) {
      console.log(err);
    }
  },

  readDirectory: async (path) => {
    try {
      const dir = await fs.readdir(__dirname + path, { encoding: 'utf8' });
      return dir
    } catch (err) {
      console.log(err);
    }
  },
}