const { Gpio } = require('onoff');

// set BCM 4 pin as 'output'
const greenLedOut = new Gpio('4', 'out');
const blueLedOut = new Gpio('23', 'out');

//let voltage = 0;

// current LED state
let isGreenLedOn = false;
let isBlueLedOn = false;

let isGreenBlinkInterval = false;
let isBluebBinkInterval = false;

module.exports = {

	blinkGreenOn: function (interval) {
		interval = interval ? interval : 1000;
		if (!isGreenBlinkInterval) {
			isGreenBlinkInterval = setInterval(() => {
				greenLedOut.writeSync(isGreenLedOn ? 0 : 1); // provide 1 or 0 
				isGreenLedOn = !isGreenLedOn; // toggle state to blink
			}, interval)
		}
	},
	blinkGreenOff: function () {
		clearInterval(isGreenBlinkInterval);
		greenLedOut.writeSync(0);
	},

	blinkBlueOn: function (interval) {
		interval = interval ? interval : 1000;
		if (!isBluebBinkInterval) {
			isBluebBinkInterval = setInterval(() => {
				blueLedOut.writeSync(isBlueLedOn ? 0 : 1); // provide 1 or 0 
				isBlueLedOn = !isBlueLedOn; // toggle state  to blink
			}, interval)
		}
	},
	blinkBlueOff: function () {
		clearInterval(isBluebBinkInterval);
		blueLedOut.writeSync(0); // provide 1 or 0 
	},
	// toggleGreen: function () {
	// 	greenLedOut.writeSync(isGreenLedOn ? 0 : 1);
	// 	isGreenLedOn = !isGreenLedOn;
	// }
}
