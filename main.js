
const led = require('./rpi-led-out.js');
const lightSensor = require('./light-sensor.js')
const puppeteer = require('./puppet.js')
const oled = require('./oled.js')
const pingIP = require('./pingRouter')
const { exit } = require('node:process');

let counter = 0;
let divider = 1;
let lastLumens = 0;

const mainInterval = 10000;
const pingInterval = 10000;

let maxValue = 40000;
let prevAmp = -1;

async function main() {
	ip = pingIP.checkGetIP();
	const res = await processLightToAmps();
	led.blinkBlueOn(500);

	if (res) {
		setTimeout(() => {
			main();
		}, mainInterval)

	} else {
		startReStart();
	}
}

async function startReStart() {
	// oled.clearDisplay();
	led.blinkGreenOn(200);

	const ip = pingIP.checkGetIP();

	lastLumens = lightSensor.init();

	oled.displayStatus('Starting', false, lastLumens, false, ip);

	

	if (ip && lastLumens) {

		const isChargerPageAvailible = true// await puppeteer.pingCharger();

		if (isChargerPageAvailible) {
			main();

		} else {
			led.blinkBlueOff();

			oled.displayStatus('No charger', false, lastLumens, false, ip);

			setTimeout(() => {
				startReStart()
			}, pingInterval)
		}

	} else {
		if(!ip) {
			console.log('startReStart checkGetIP false')
		} else {
			console.log('startReStart light sensor false')
		}
		
		setTimeout(() => {
				startReStart()
			}, pingInterval)
	}

}


function calcNewAmp(currentLum) {

	const percentLight = currentLum * 100 / maxValue;
	let newAmp = 0;

	if (percentLight >= 5 && percentLight < 20) newAmp = 7;
	if (percentLight >= 20 && percentLight < 25) newAmp = 9;
	if (percentLight >= 25 && percentLight < 30) newAmp = 11;
	// if (percentLight >= 40 && percentLight < 50) newAmp = 13;
	if (percentLight >= 30) newAmp = 15;

	return { newAmp, percentLight }
}

function printLightAndAmpsData(lumens, percentLight, amps, isChanged) {
	const d = new Date();
	const timestamp = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ';
	const str = (timestamp + 'lumens: ' + lumens.toString() + ' in percent: ' + percentLight + ' amps: ' + amps.toString() + ' isChanged: ' + isChanged.toString()); // process.stdout.write
	console.log(str);
}

async function processLightToAmps() {

	const lumens = lightSensor.getAverageBy10Data();
	const calcNewAmpRes = calcNewAmp(lumens);
	const newAmp = calcNewAmpRes.newAmp;
	const percentLight = calcNewAmpRes.percentLight;
	let res = false;
	const ppa = prevAmp

	if (prevAmp !== newAmp) {
		//res = await puppeteer.changeChargingAmperage(newAmp);
		prevAmp = newAmp;
	} else {
		res = true;
	}

	printLightAndAmpsData(lumens, percentLight, newAmp, ppa !== newAmp)
	const ip = pingIP.checkGetIP();
	oled.displayStatus('Ready', newAmp, lumens, percentLight, ip);

	return res
}

startReStart()


