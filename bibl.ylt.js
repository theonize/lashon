console.time("net_train")

const fs = require('fs')
const brain = require('brain.js')
const trainingData = require('./ylt.json')

const net = new brain.recurrent.LSTM();

const model = require('./model.ylt.json')
net.fromJSON(model)

let num_lines = 3
let training_subset = []
let start_line = Math.floor(Math.random() * 31086)

for (curr_line = start_line; curr_line < (start_line+num_lines); curr_line++) {
	let line = trainingData[curr_line]

	line = line.split(' ')

	console.log(line)
	for (let I=0; I < line.length; I += 3) {
		let phrase = [line[I],line[I+1],line[I+2],line[I+3]]
		phrase = phrase.join(' ')

		training_subset.push(phrase)
	}
	
	try {
		net.train(training_subset, {
			iterations: 1000,
			errorThresh: 0.011,
			log: (stats)=>{
				console.info(stats)
			},
		})
	} catch (error) {
		console.error(error, training_subset)		
	}
}

console.log(`training lines ${start_line} thru ${start_line+num_lines}`, training_subset)

// console.log(net.run('He is'))
// console.log(net.run('I was'))

fs.writeFileSync('./model.ylt.json', JSON.stringify(net.toJSON()))

console.timeEnd("net_train")