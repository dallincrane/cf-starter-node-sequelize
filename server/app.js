var path = require('path')
var express = require('express')
var favicon = require('serve-favicon')
var logger = require('morgan')
var session = require('express-session')
var bodyParser = require('body-parser')

var routes = require('./routes/index.js')

var config = require('./config/index.js')

var app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, '../client/images/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
console.log(config.session)
app.use(session(config.session))
app.use(express.static(path.join(__dirname, '../client')))

app.use('/', routes)

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', { message: err.message, error: err })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', { message: err.message, error: {} })
})

module.exports = app
