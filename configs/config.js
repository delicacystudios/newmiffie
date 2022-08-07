module.exports = {
  bot: {
    token: process.env['TOKEN'],
    id: '944341740243017728',
    db: process.env['MongoDB'],
    devID: ['528930032823959562'],
  },
  
  chat: {
    prefix: 'm/',
    server: 'https://discord.gg/57AZ5fRrRg'
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
  
  Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80,
    pass: "youshallnotpass",
    secure: false
  },
  
  port: 25565,
  CustomDomain: true,
  domain: "https://newmiffie.natedev.tk",
  clientSecret: process.env['ClientSecret']
}