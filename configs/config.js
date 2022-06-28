module.exports = {
  bot: {
    token: process.env['TOKEN'],
    id: '944341740243017728',
    db: process.env['MongoDB'],
    devID: ['528930032823959562']
  },
  
  chat: {
    prefix: 'm/',
    server: 'https://discord.gg/57AZ5fRrRg'
  },
  
  embeds: {
    color: '#a94dff',
    error: '#fe8780'
  },

  port: 25565,
  CustomDomain: true,
  domain: "https://newmiffie.natedev.tk",
  clientSecret: process.env['ClientSecret']
}