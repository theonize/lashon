console.time("net_train")

const fs = require('fs')
const brain = require('brain.js')

const net = new brain.recurrent.LSTM();

const model = require('./model.ylt.json')
net.fromJSON(model)

console.log(net.run('And Abraham'))
console.log(net.run('Because the chase'))


console.timeEnd("net_train")
