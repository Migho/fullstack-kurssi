const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const env = require('./.env')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})