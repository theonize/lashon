const brain = require('brain.js')
const fs = require('fs')
const netFile = './model.example.json'

let model

try {
  model = require(netFile)
} catch (error) {
  console.error(model)
}

const trainingData = [
  'Jane saw Doug.',
  'Jane tolerated Doug.',
  'It was love at first sight, and Spot had a frontrow seat.',
  'Spot saw Doug and Jane looking at each other.',
  'Spot liked being a dog.',
  'It was a very special moment for all.',
  'Doug loved Jane.',
  'Doug saw Jane.',
];

const lstm = new brain.recurrent.LSTM();
if (model) lstm.fromJSON(model)

const result = lstm.train(trainingData, {
  iterations: 1500,
  log: details => console.log(details),
  errorThresh: 0.012
});

const run1 = lstm.run('Jane');
const run2 = lstm.run('Doug');
const run3 = lstm.run('Spot');
const run4 = lstm.run('It');

console.log('run 1: Jane' + run1);
console.log('run 2: Doug' + run2);
console.log('run 3: Spot' + run3);
console.log('run 4: It' + run4);

fs.writeFileSync(netFile, JSON.stringify(lstm.toJSON()))