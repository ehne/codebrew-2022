const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    customWorkerDir: 'lib/worker'
  }
})