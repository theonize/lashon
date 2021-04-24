console.time("net_train")

const fs = require('fs')
const brain = require('brain.js')
const trainingData = require('./ylt.json')

const net = new brain.recurrent.LSTM();

const model = require('./model.ylt.json')
// net.fromJSON(model)

let num_lines = 10
let num_sections = 100

for (let X = 0; X < num_sections; X++) {
	let phrase_length = Math.floor(Math.random()*4)+3
	let start_line = Math.floor(Math.random() * 31086)
	let training_subset = []
	
	console.log(`training lines ${start_line} thru ${start_line+num_lines}`, training_subset)

	for (let curr_line = start_line; curr_line < (start_line+num_lines); curr_line++) {
		let line = trainingData[curr_line]
		
		line = line.split(' ')
		
		for (let I=0; I < line.length; I += phrase_length) {
			let phrase = []
			
			for (let J=I; J < I+phrase_length; J++) {
				phrase.push(line[J])
			}

			phrase = phrase.join(' ')
			
			training_subset.push(phrase)
		}
		
		try {
			console.log(training_subset)
	
			net.train(training_subset, {
				iterations: 1000,
				errorThresh: 0.015,
				log: (stats)=>{
					process.stdout.write(`${stats}\r`)
				},
			})

			fs.writeFileSync('./model.ylt.json', JSON.stringify(net.toJSON()))
		} catch (error) {
			console.error(error)		
		}
	}
	
}

console.timeEnd("net_train")