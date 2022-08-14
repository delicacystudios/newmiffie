module.exports = {
  bot: {
    token: process.env['TOKEN'],
    id: '947810923593203732',
    db: process.env['MongoDB'],
    devID: '528930032823959562' || '564845500160016395',
    language: 'en'
  },
  
  chat: {
    prefix: 'm/' || 'M/',
    server: 'https://discord.gg/57AZ5fRrRg',
    lang: 'ru'
  },
  
  embeds: {
    color: '#ff8bce',
    premium: '#ffd173',
    developer: '2e3135',
    error: '#fe8780'
  },

  keys: {
    CatKey: process.env['CatKey']
  },
  
  systems: {
    bugreport: '1007457075338690650' // канал для репортов
  },
  
  port: 20,
  CustomDomain: true,
  domain: "https://newmiffie.natedev.tk",
  clientSecret: process.env['ClientSecret']
}