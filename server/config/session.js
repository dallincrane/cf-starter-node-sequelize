const config = {}

config.shared = {
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // one week
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}

config.development = {}

config.test = {}

config.production = {
  cookie: {
    domain: '.dmnext.io',
    maxAge: 1000 * 60 * 60 * 24 * 7, // one week
  }
}

const env = process.env.NODE_ENV || 'development'
module.exports = Object.assign({}, config.shared, config[env])
