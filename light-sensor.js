const i2c = require('i2c-bus');

const GY30_ADDR = 0x23;
const LUM_REG = 0x10;

let i2c0;

function readSensor() {
	const data = i2c0.readWordSync(GY30_ADDR, LUM_REG);
			return data

}

function getAverageBy10Data () {
	let counter = 0;
	let lumensArray = [];

	if(!i2c0) i2c0 = i2c.openSync(0);

	while (counter < 10) {
		const measuredLumens = readSensor();
				lumensArray.push(measuredLumens);
				counter++
	}		
	const averageLum = lumensArray.reduce((a, b) => a + b )/lumensArray.length

	return averageLum
}

function init() {
	try {
		i2c0 = i2c.openSync(0);
		const measurement = i2c0.readWordSync(GY30_ADDR, LUM_REG);

		return measurement || 'ZERO'
	} catch (error) {
		console.log('Light Sensor Error')
		return 'NOSENSOR'
	}
	
}
 

module.exports = {
	getData: () => readSensor(),
	getAverageBy10Data,
	init,
}


// function getFiltered() {
// 	let currentMax = 0;
// 	let lumensArray = [];


// 	for (i = 0; i <= 12; i++) {
// 		const currentLumens = readSensor();
// 		lumensArray[i] = currentLumens;

// 	} // get 12 measurements

// 	currentMax = Math.max(...lumensArray);

// 	if (currentMax) {
// 		lumensArray.splice(lumensArray.indexOf(currentMax), 1);
// 		currentMax = Math.max(...lumensArray);
// 	}

// 	let currentMin = Math.min(...lumensArray);
// 	if (currentMin) {
// 		lumensArray.splice(lumensArray.indexOf(currentMin), 1);
// 	}
// 	//deleting highest and lowest val
// 	const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

// 	if (maxLumens < currentMax) maxLumens = currentMax;
// 	const ave = average(lumensArray);
	
// 	return ave;
// }
