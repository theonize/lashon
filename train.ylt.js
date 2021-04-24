const brain = require('brain.js')
const fs = require('fs')
const netFile = './model.ylt.json'
const textData = require('./ylt.json')

const num_lines = 10
const start_line = Math.floor(Math.random() * (31086 - num_lines))

const end_line = start_line + num_lines
const trainingData = textData.slice(start_line, end_line)

console.log(trainingData)

let model

try {
  model = require(netFile)
} catch (error) {
  console.error(model)
}


const lstm = new brain.recurrent.LSTM();
if (model) lstm.fromJSON(model)

const result = lstm.train(trainingData, {
  iterations: 1500,
  log: details => console.log(details),
  errorThresh: 0.05
});

fs.writeFileSync(netFile, JSON.stringify(lstm.toJSON()))


const tests = ['The', 'Was', 'Had', 'Who', 'It',]

for (let data of trainingData) {
  const testPhrase = data.split(' ')[0]
  console.log('run:', testPhrase, lstm.run(testPhrase))
}