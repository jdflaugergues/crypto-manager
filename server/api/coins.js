'use strict';

const cryptoRouter = require('koa-router')()
const bodyParser = require('koa-body')

const { errors } = require('../lib/errors');
const CoinDao = require('../dao/coin-dao')


cryptoRouter
  .get('/', getCoins)
  .patch('/:coinSymbol', bodyParser(), updateCoin)

async function updateCoin(ctx) {

  const coin = await CoinDao.getCoin(ctx.params.coinSymbol)

  ctx.assert(coin, 404, `No coin for id ${ctx.params.coinSymbol}`, { code: errors.NOT_FOUND });

  Object.keys(ctx.request.body).forEach((property) => {
    coin[property] = ctx.request.body[property]
  })

  ctx.state.logger.info('ctx.request', ctx.request)
  ctx.state.logger.info('ctx.request.body', ctx.request.body)
  ctx.state.logger.info('coin', coin)

  await coin.save()

  ctx.body = coin
  ctx.status = 200
}


async function getCoins(ctx) {
  const coins = await CoinDao.getCoins()

  ctx.state.logger.info('coins', coins)

  ctx.body = coins
  ctx.status = 200;
}


module.exports = cryptoRouter
