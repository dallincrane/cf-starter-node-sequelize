var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(module.filename)
var config = require('../config/index')
var db = {}

var sequelize = new Sequelize(config.postgres)

fs
.readdirSync(__dirname)
.filter(file => (file.indexOf('.') !== 0) && (file !== basename))
.forEach(file => {
  if (file.slice(-3) !== '.js') return
  var model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
