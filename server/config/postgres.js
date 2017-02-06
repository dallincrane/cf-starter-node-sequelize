const url = require('url')
const cfenv = require('cfenv')

const config = {}

config.shared = {
  dialect: 'postgres'
}

config.development = {
  host: '127.0.0.1',
  port: '5432',
  database: 'todos-development',
}

config.test = {
  host: '127.0.0.1',
  port: '5432',
  database: 'todos-test',
}

config.production = {}

if (process.env.VCAP_APPLICATION) {
  const appEnv = cfenv.getAppEnv()
  const connUri = appEnv.getService('postgres-core').credentials.uri
  const connUriParts = url.parse(connUri)

  config.production.host = connUriParts.hostname
  config.production.port = connUriParts.port
  config.production.database = connUriParts.pathname.substring(1)

  const uriAuth = connUriParts.auth.split(':')
  config.production.username = uriAuth[0]
  config.production.password = uriAuth[1]
}

const env = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, config.shared, config[env])
