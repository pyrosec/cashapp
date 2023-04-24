
var { CashAppClient, getKeyManager } = require('./');
var cashapp = CashAppClient.fromObject(require(process.env.HOME + '/.cashapp/session'))

