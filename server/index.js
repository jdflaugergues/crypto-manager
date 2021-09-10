const config = require('config')
const bunyan = require('bunyan')

const log = bunyan.createLogger(config.log)

const app = require('./app')

log.info('server started')
