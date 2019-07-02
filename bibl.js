console.time("net_train")

const fs = require('fs')
const brain = require('brain.js')
const model = require('./model.json')
// const trainingData = require('./ylt.json')
const trainingData = require('./nlt_plain.json')

const net = new brain.recurrent.LSTM();
net.fromJSON(model)

for (let num_groups = 0; num_groups < 10; num_groups++) {
    let num_lines = 10
    let training_subset = []
    let start_line = Math.floor(Math.random() * 31086)

    for (curr_line = start_line; curr_line < (start_line+num_lines); curr_line++) {
        let index = 

        training_subset.push(trainingData[curr_line])
    }

    console.log(`training lines ${start_line} thru ${start_line+num_lines}`)
    net.train(training_subset, {
        iterations: 10,
        errorThresh: 0.011,
        log: (stats)=>{
            console.info(stats)
        }
    });

    console.log(net.run('He is'))
    console.log(net.run('I was'))

    fs.writeFileSync('./model.json', JSON.stringify(net.toJSON()))
}

console.timeEnd("net_train")
