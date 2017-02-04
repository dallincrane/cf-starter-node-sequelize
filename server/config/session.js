const config = {}

config.shared = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  maxAge: 1000 * 60 * 60 * 24 * 7, // one week
  domain: '.devmountain.com',
  resave: false,
  saveUninitialized: false
}

config.development = {}

config.test = {}

config.production = {
  cookie: { secure: true }
}

const env = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, config.shared, config[env])
