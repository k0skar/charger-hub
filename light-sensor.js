
const i2c = require('i2c-bus');

const GY30_ADDR = 0x23;
const LUM_REG = 0x10;

//setInterval (readSensor, 500);
let maxLumens = 0;
let minLumens = 0;

function readSensor(interval) {
	if (interval) {
		setInterval(() => {
			const i2c0 = i2c.openSync(0);
			const data = i2c0.readWordSync(GY30_ADDR, LUM_REG);
			return data
		}, interval)
	} else {
		const i2c0 = i2c.openSync(0);
		const data = i2c0.readWordSync(GY30_ADDR, LUM_REG);
		return data
	}

}

function getFiltered() {
	let currentMax = 0;
	let lumensArray = [];


	for (i = 0; i <= 12; i++) {
		const currentLumens = readSensor();
		lumensArray[i] = currentLumens;

	} // get 12 measurements

	currentMax = Math.max(...lumensArray);

	if (currentMax) {
		lumensArray.splice(lumensArray.indexOf(currentMax), 1);
		currentMax = Math.max(...lumensArray);
	}

	let currentMin = Math.min(...lumensArray);
	if (currentMin) {
		lumensArray.splice(lumensArray.indexOf(currentMin), 1);
	}
	//deleting highest and lowest val
	const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

	if (maxLumens < currentMax) maxLumens = currentMax;
	const ave = average(lumensArray);
	
	return ave;
}


module.exports = {
	getData: () => readSensor(),
	getAverageBy10Data: (mainInterval) => readSensor(mainInterval/10),
	getFilteredData: () => getFiltered()

}