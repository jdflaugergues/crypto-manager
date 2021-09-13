'use strict';

const Router = require('koa-router')

const coins = require('./coins')

const router = new Router()

router.get('/ping', (ctx) => {
  ctx.body = 'Crypto Manager OK'
});

router.use('/coins', coins.routes(), coins.allowedMethods())

module.exports = router;
