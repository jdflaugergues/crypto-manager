const mongoose = require('mongoose')
const config = require('config')

function connect() {
  return mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

function close(cb) {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  return mongoose.connection.close(cb)
}

module.exports = { connect, close }
