var i2c = require('i2c-bus');
var oled = require('oled-i2c-bus');

var opts = {
  width: 128,
  height: 64,
  address: 0x3c,
  bus: 0,
  driver: "SSD1306"
};


var i2cBus = i2c.openSync(opts.bus)
var oled = new oled(i2cBus, opts);

var font = require('oled-font-5x7');

 //oled.clearDisplay();
 //oled.drawLine(1, 1, 128, 32, 1);

 function clearDisplay() {
  oled.clearDisplay();
 }

function displayStatus(status, amps, lumens, percentLight, ip) {
  
  let ampsStr = (amps || amps === 0) ? ' ' + amps + 'A' : ' ???';
  
  if (amps) {
    ampsStr = ' ' + amps + 'A' 
  } else if (amps === 0) {
    ampsStr = 'OFF';
  } else {
    ampsStr = '???';
  }

  const lumensStr = (lumens || lumens === 0) ? ' ' + lumens : ' ???';


  try {
    oled.clearDisplay();
    if (ip) {
      oled.setCursor(1, 1);
      oled.writeString(font, 1, ip.ipFirst, 1, true);
      oled.writeString(font, 2, ip.ipSecond, 1, true);
    }

    oled.setCursor(1, 20);
    oled.writeString(font, 2, status || 'Pending', 1, true);
    if (percentLight) {
      oled.writeString(font, 2, ' ' + Math.round(percentLight) + '%', 1, true);
    }

    oled.setCursor(1, 40);
    oled.writeString(font, 3, ampsStr, 1, true);
    oled.writeString(font, 2, lumensStr, 1, true);
    oled.writeString(font, 1, ' lm', 1, true);

  } catch (e) {
    console.log('Display write error ' + e)
  }


  // obj font - font object in JSON format (see note below on sourcing a font)
  // int size - font size, as multiplier. Eg. 2 would double size, 3 would triple etc.
  // string text - the actual text you want to show on the display.
  // int color - color of text. Can be specified as either 0 for 'off' or black, and 1 or 255 for 'on' or white.
  // bool wrapping - true applies word wrapping at the screen limit, false for no wrapping. If a long string 
  // without spaces is supplied as the text, just letter wrapping will apply instead.
}


function turnOff() {
  oled.turnOffDisplay();
}

//oled.turnOffDisplay();
//oled.turnOnDisplay();

module.exports = {
  displayStatus, clearDisplay, turnOff
}