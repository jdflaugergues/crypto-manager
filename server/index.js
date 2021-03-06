const config = require('config')
const bunyan = require('bunyan')

const cronManager = require('./cron')
const {connect, close} = require('./database')
const app  = require('./app')

const log = bunyan.createLogger(config.log)
const port = process.env.PORT || config.port

connect()
  .then(() => {
    log.info('MongoDB database connected')
    log.info('Email service active :', config.emailService.active)
    app.listen(port)
    cronManager.start()
    log.info('Server started on:', port)
  })
  .catch((err) => {
    log.error(`Cannot connect to mongo ${config.database.url} [${err}]`)
    close(() => process.exit(1)) // eslint-disable-line no-process-exit
  })

