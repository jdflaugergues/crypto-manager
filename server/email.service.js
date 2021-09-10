const nodemailer = require('nodemailer')
const bunyan = require('bunyan')
const config = require('config')

const log = bunyan.createLogger(config.log)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jdflaugergues@gmail.com',
    pass: 'kkkavrvxzngenpnt'
  }
})

const mailOptions = {
  from: 'jdflaugergues@gmail.com',
  to: 'jdflaugergues@gmail.com',
  subject: '[Crypto] Alerte',
};

const sendMail = (text) => {
  transporter.sendMail({...mailOptions, text}, function (error, info) {
    if (error) {
      log.error(error);
    } else {
      log.info('Email sent: ' + info.response);
    }
  })
}

module.exports = {
  sendMail
}
