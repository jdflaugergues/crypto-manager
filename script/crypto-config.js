const TransactionTypeEnum = require('../server/enums/TransactionType')

module.exports = [
  { name: 'Solana', symbol: 'SOL', min: 80, max: 123, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
    {date: new Date(2021,7,17,18,9), spent: 9, price: 59.3773, type: TransactionTypeEnum.PURCHASE},
    {date: new Date(2021,7,17,0,14), spent: 1, price: 55.3847, type: TransactionTypeEnum.PURCHASE},
    {date: new Date(2021,7,20,10,31), spent: 90, price: 61.1090, type: TransactionTypeEnum.PURCHASE},
    {date: new Date(2021,8,6,23,0), spent: 400, price: 138.0902, type: TransactionTypeEnum.PURCHASE},
    {date: new Date(2021,8,7,9,39), spent: 500, price: 159.0166, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Bancor', symbol: 'BNT', min: 2, max: 3.11, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
    {date: new Date(2021,7,17,0,16), spent: 1, price: 3.5752, type: TransactionTypeEnum.PURCHASE},
    {date: new Date(2021,8,6, 15,11), spent: 499, price: 4.0382, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Orchid', symbol: 'OXT', min: 0.18, max: 0.28, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,20), spent: 1, price: 0.3317, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,8,6, 15,9), spent: 499, price: 0.3824, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'UMA', symbol: 'UMA', min: 5, max: 8.75, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,21), spent: 1, price: 10.1599, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,19,45), spent: 9, price: 10.8496, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,8,6, 15,10), spent: 490, price: 11.5577, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Stellar', symbol: 'XLM', min: 0.15, max: 0.25, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,14), spent: 1, price: 0.3244, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,8,6, 15,11), spent: 499, price: 0.3389, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'NuCypher', symbol: 'NU', min: 0.10, max: 0.25, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,19), spent: 1, price: 0.2457, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,19,57), spent: 9, price: 0.2510, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20, 10,32), spent: 90, price: 0.2577, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Ethereum', symbol: 'ETH', min: 1500, max: 2655, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13,7,33), spent: 1, price: 2669.1578, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,13,13,12), spent: 9, price: 2767.3617, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20, 11,18), spent: 90, price: 2747.3689, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Bitcoin', symbol: 'BTC', min: 30000, max: 37737, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13,7,35), spent: 1, price: 38661.9859, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,13,13,13), spent: 9, price: 39569.4996, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20, 10,21), spent: 90, price: 40189.6953, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Litecoin', symbol: 'LTC', min: 80, max: 140, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,14, 7,12), spent: 10, price: 152.5229, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,31), spent: 90, price: 149.8871, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Cardano', symbol: 'ADA', min: 0.85, max: 1.85, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13, 7,38), spent: 1, price: 1.6716, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,13, 13,12), spent: 9, price: 1.7457, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,32), spent: 90, price: 2.1295, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Bitcoin Cash', symbol: 'BCH', min: 370, max: 470, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,14, 7,12), spent: 10, price: 557.3669, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,30), spent: 90, price: 563.0446, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'XRP', symbol: 'XRP', min: 0.40, max: 0.8, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13, 18,15), spent: 10, price: 0.8649, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,15,12,19), spent: 101.33, price: 1.1091, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,15,12,22), spent: 11.3, price: 1.0978, type: TransactionTypeEnum.SALE}
  ]},
  { name: 'The Graph', symbol: 'GRT', min: 0.50, max: 0.62, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13, 7,36), spent: 1, price: 0.7818, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,18,10), spent: 9, price: 0.8178, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,17), spent: 90, price: 0.8880, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'DogeCoin', symbol: 'DOGE', min: 0.10, max: 0.18, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13, 7,39), spent: 1, price: 0.2315, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,13,13,13), spent: 9, price: 0.2391, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,15,23,30), spent: 90, price: 0.2793, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Cosmos', symbol: 'ATOM', min: 10, max: 32, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,17), spent: 1, price: 13.8423, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,33), spent: 10, price: 16.4775, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: '1inch', symbol: '1INCH', min: 1.7, max: 2.3, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,15), spent: 1, price: 2.6466, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,23), spent: 9, price: 2.9488, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,20,10,29), spent: 9, price: 2.9731, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Tellor', symbol: 'TRB', min: 33, max: 43, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,21), spent: 1, price: 45.8727, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,19,56), spent: 9, price: 48.8968, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'SushiSwap', symbol: 'SUSHI', min: 7, max: 9.27, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,21), spent: 1, price: 11.0400, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,18,10), spent: 9, price: 12.0135, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Mirror Protocol', symbol: 'MIR', min: 1.73, max: 2.73, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,19), spent: 1, price: 3.3998, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,19,45), spent: 9, price: 4.0328, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Skale Network', symbol: 'SKL', min: 0.15, max: 0.28, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17, 0,20), spent: 1, price: 0.2888, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,0,20), spent: 1, price: 0.2887, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Celo', symbol: 'CELO', min: 2.5, max: 5.4, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,17), spent: 1, price: 2.6642, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'AlgoRand', symbol: 'ALGO', min: 0.5, max: 1.45, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,16), spent: 1, price: 0.8207, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Ankr', symbol: 'ANKR', min: 0.05, max: 0.07, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,16), spent: 1, price: 0.0884, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,0,14), spent: 1, price: 0.0884, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'OMG Network', symbol: 'OMG', min: 5, max: 9.12, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,20), spent: 1, price: 4.8752, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'AMP', symbol: 'AMP', min: 0.02, max: 0.038, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,14), spent: 1, price: 0.0516, type: TransactionTypeEnum.PURCHASE},
      {date: new Date(2021,7,17,0,15), spent: 1, price: 0.0516, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Polkadot', symbol: 'DOT', min: 15, max: 25.5, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,14), spent: 1, price: 21.2627, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Curve Finance', symbol: 'CRV', min: 1.3, max: 2.16, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,17), spent: 1, price: 1.8402, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Loopring', symbol: 'LRC', min: 0.15, max: 0.35, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,19), spent: 1, price: 0.2978, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Filecoin', symbol: 'FIL', min: 35, max: 66, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,18), spent: 1, price: 63.2873, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Keep', symbol: 'KEEP', min: 0.20, max: 0.34, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,19), spent: 1, price: 0.3283, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Numeraire', symbol: 'NMR', min: 20, max: 36, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,20), spent: 1, price: 35.0758, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Band Protocol', symbol: 'BAND', min: 5, max: 6.75, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,16), spent: 1, price: 7.2582, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: '0x', symbol: 'ZRX', min: 0.5, max: 0.80, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,15), spent: 1, price: 0.8888, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Synthetix', symbol: 'SNX', min: 8, max: 9.6, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,21), spent: 1, price: 10.5890, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Chainlink', symbol: 'LINK', min: 15, max: 21.06, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,17), spent: 1, price: 24.2805, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Storj', symbol: 'STORJ', min: 0.8, max: 1.01, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,21), spent: 1, price: 1.1528, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Decentraland', symbol: 'MANA', min: 0.5, max: 0.61, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,18), spent: 1, price: 0.7295, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Enjin', symbol: 'ENJ', min: 1, max: 1.204, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,18), spent: 1, price: 1.4154, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Basic Attention Token', symbol: 'BAT', min: 0.4, max: 0.58, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,16), spent: 1, price: 0.6764, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Matic/Polygon', symbol: 'MATIC', min: 0.8, max: 1.025, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,19), spent: 1, price: 1.2314, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Origin Protocol', symbol: 'OGN', min: 0.5, max: 0.75, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,20), spent: 1, price: 0.9193, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Internet Computer', symbol: 'ICP', min: 30, max: 42.54, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,18), spent: 1, price: 53.2847, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Kyber', symbol: 'KNC', min: 1, max: 1.32, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,19), spent: 1, price: 1.6645, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'iExec', symbol: 'RLC', min: 1, max: 2.87, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,22), spent: 1, price: 3.5680, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'EOS', symbol: 'EOS', min: 2.5, max: 3.707, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,18), spent: 1, price: 4.7873, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'NKN (New Kind of Network)', symbol: 'NKN', min: 0.15, max: 0.28, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13,7,35), spent: 1, price: 0.3603, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Chiliz', symbol: 'CHZ', min: 0.18, max: 0.2417, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,13,7,35), spent: 1, price: 0.3155, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Cartesi', symbol: 'CTSI', min: 0.3, max: 0.5036, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,17), spent: 1, price: 0.6544, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Compound', symbol: 'COMP', min: 200, max: 297.75, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,17), spent: 1, price: 410.3355, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'yearn.finance', symbol: 'YFI', min: 15000, max: 25720, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,22), spent: 1, price: 34065.7468, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Uniswap', symbol: 'UNI', min: 10, max: 18.6, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,21), spent: 1, price: 25.2209, type: TransactionTypeEnum.PURCHASE}
  ]},
  { name: 'Aave', symbol: 'AAVE', min: 150, max: 262, alertPurchaseEnabled: false, alertSaleEnabled: true, transactions: [
      {date: new Date(2021,7,17,0,15), spent: 1, price: 359.4648, type: TransactionTypeEnum.PURCHASE}
  ]}
]
