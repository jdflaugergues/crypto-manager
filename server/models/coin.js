const mongoose = require('mongoose')
const TransactionTypeEnum = require('../enums/TransactionType')

mongoose.Promise = global.Promise

const { Schema } = mongoose

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: [TransactionTypeEnum.SALE, TransactionTypeEnum.PURCHASE],
      required: true
    },
    date: {
      type: Date,
      required: true,
    },
    spent: { // Argent dépensé dans la devise
      type: Number,
      required: true,
    },
    price: { // Prix d'une unité de crypto-monnaie dans la devise utilisée
      type: Number,
      required: true,
    },
    // Frais de change
    exchangeCosts: {
      type: Number,
      default: 1.5 // Revolut prend 1.5% en frais de change sur les crypto-monnaies
    },
    currency: {
      type: String,
      default: 'EUR' // Devise dans laquelle est effectuée la transactions
    }
  })

const coinSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    rate: {
      type: Number
    },
    emailDisabled: {
      type: Boolean
    },
    alertPurchaseEnabled: {
      type: Boolean
    },
    alertSaleEnabled: {
      type: Boolean
    },
    transactions: [transactionSchema]
  },
  { versionKey: false, strict: 'throw', useNestedStrict: true, timestamps: true }
);

module.exports = coinSchema
