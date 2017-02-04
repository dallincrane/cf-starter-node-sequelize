var app = require('../server/app')
var appEnv = require('cfenv').getAppEnv()
var debug = require('debug')('nps:server')
var http = require('http')

var server = http.createServer(app)
server.listen(appEnv.port, appEnv.bind)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) { return val } // named pipe
  if (port >= 0) { return port } // port number
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') { throw error }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('Listening on ' + bind)
}
