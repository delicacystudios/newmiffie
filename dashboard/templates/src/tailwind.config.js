module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ["Open Sans"]
    },

    colors: {
      dark: '#23272A',
      main: '#2C2F33'
    },
    
    extend: {}
  },

  corePlugins: {
    overflow: false
  },
  
  plugins: []
}