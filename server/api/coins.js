'use strict';

const cryptoRouter = require('koa-router')()
const bodyParser = require('koa-body')

const { errors } = require('../lib/errors');
const CoinDao = require('../dao/coin-dao')


cryptoRouter
  .get('/', getCoins)
  .patch('/:coinId', bodyParser(), updateCoin)

async function updateCoin(ctx) {
  const date = Date.now()
  const coin = await CoinDao.getCoinById(ctx.params.coinId)

  ctx.assert(coin, 404, `No coin for id ${ctx.params.coinId}`, { code: errors.NOT_FOUND });

  if (ctx.request.body.min) {
    coin.min = ctx.request.body.min
  }
  if (ctx.request.body.max) {
    coin.max = ctx.request.body.max
  }

  if (ctx.request.body.sale) {
    console.log('ctx.request.body.sale', ctx.request.body.sale)
    coin.sales.push({...ctx.request.body.sale, date});
  }
  if (ctx.request.body.purchase) {
    coin.purchases.push({...ctx.request.body.purchase, date});
  }


  // Object.keys(ctx.request.body).forEach((property) => {
  //   coin[property] = ctx.request.body[property]
  // })

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
