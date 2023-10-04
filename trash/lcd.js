var LCD = require('raspberrypi-liquid-crystal');
var lcd = new LCD( 0, 0x3c, 16, 2 );
lcd.beginSync();
lcd.clearSync();
lcd.printLineSync(0, 'THis is line 1');
lcd.printLineSync(1, 'THis is line 2');
function print(str1, str2) {
    lcd.clearSync();
    lcd.printLineSync(0, 'THis is line 1');
    lcd.printLineSync(1, 'THis is line 2');
}



module.exports = {
    print
}