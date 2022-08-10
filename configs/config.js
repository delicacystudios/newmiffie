module.exports = {
  bot: {
    token: process.env['TOKEN'],
    id: '944341740243017728',
    db: process.env['MongoDB'],
    devID: '528930032823959562' || '564845500160016395'
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
  
  player: {
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
      }
    }
  },
  
  port: 20,
  CustomDomain: true,
  domain: "https://newmiffie.natedev.tk",
  clientSecret: process.env['ClientSecret']
}