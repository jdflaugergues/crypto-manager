const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const { Schema } = mongoose

const purchaseSaleSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
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
      type: Number,
      required: true
    },
    purchases: [purchaseSaleSchema],
    sales: [purchaseSaleSchema]
  },
  { versionKey: false, strict: 'throw', useNestedStrict: true, timestamps: true }
);

module.exports = coinSchema
