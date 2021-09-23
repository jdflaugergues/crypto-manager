'use strict';

const cryptoRouter = require('koa-router')()
const bodyParser = require('koa-body')

const { errors } = require('../lib/errors');
const CryptocurrencyDao = require('../dao/cryptocurrency-dao')
const TransactionTypeEnum = require('../enums/TransactionType')

cryptoRouter
  .get('/', getCoins)
  .patch('/:coinId', bodyParser(), updateCoin)

async function updateCoin(ctx) {
  const date = Date.now()
  const coin = await CryptocurrencyDao.getCoinById(ctx.params.coinId)

  ctx.assert(coin, 404, `No coin for id ${ctx.params.coinId}`, { code: errors.NOT_FOUND });

  if (ctx.request.body.min) {
    coin.min = ctx.request.body.min
  }
  if (ctx.request.body.max) {
    coin.max = ctx.request.body.max
  }
  if (ctx.request.body.stage) {
    coin.stage = ctx.request.body.stage
  }

  if (ctx.request.body.hasOwnProperty('alertSaleEnabled')) {
    coin.alertSaleEnabled = ctx.request.body.alertSaleEnabled
  }
  if (ctx.request.body.hasOwnProperty('alertPurchaseEnabled')) {
    coin.alertPurchaseEnabled = ctx.request.body.alertPurchaseEnabled
  }

  if (ctx.request.body.transaction) {
    coin.transactions.push({...ctx.request.body.transaction, date});
    if (ctx.request.body.transaction.type === TransactionTypeEnum.PURCHASE) {
      coin.max = coin.rate
      coin.alertPurchaseEnabled = false
      coin.alertSaleEnabled = true
    }
    if (ctx.request.body.transaction.type === TransactionTypeEnum.SALE) {
      coin.min = coin.rate
      coin.alertPurchaseEnabled = true
      coin.alertSaleEnabled = false
    }

  }

  await coin.save()

  ctx.body = coin
  ctx.status = 200
}


async function getCoins(ctx) {
  const coins = await CryptocurrencyDao.getCoins()

  ctx.body = coins
  ctx.status = 200;
}


module.exports = cryptoRouter
