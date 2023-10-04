const puppeteer = require('puppeteer');

const url = 'http://192.168.1.105';
let newAmperage;

async function changeChargingAmperage() {

  let launchOptions = {
    executablePath: '/usr/bin/chromium-browser',
    args: ['--start-maximized'],
    headless: "new"  //"new"
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });   // set viewport and user agent (just in case for nice viewing)
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  await page.authenticate({ 'username': 'Admin', 'password': '87737769' }); // set the HTTP Basic Authentication credential

  try {
    await page.goto(url);

    await page.evaluate((newAmperage) => {
      const currentLimitDLInput = document.querySelector('#current-limit');
      const chargerOnOffCheckbox = document.querySelector('#evseEnabled');

      if (newAmperage == 0) {
        chargerOnOffCheckbox.checked = true;
        chargerOnOffCheckbox.dispatchEvent(new Event('input', { 'bubbles': true }));

      } else {
        chargerOnOffCheckbox.checked = false;
        chargerOnOffCheckbox.dispatchEvent(new Event('input', { 'bubbles': true }));

        currentLimitDLInput.value = newAmperage;
        currentLimitDLInput.dispatchEvent(new Event('input', { 'bubbles': true }));
      }

      console.log('changing amperage ---------------------------------newAmperage: ' + newAmperage + ' Checkbox.checked: ' + chargerOnOffCheckbox.checked);

    }, newAmperage);

    setTimeout(() => {
      browser.close();
    }, 1000)

    return true;

  } catch (e) {
    console.log('changeChargingAmperage catch (charger off?) ' + e)
    await browser.close();
    return false;
  }

}

async function pingCharger() {
  let ping = false;
  let launchOptions = {
    executablePath: '/usr/bin/chromium-browser',
    headless: "new"  //"new"
  }

  // launch the browser with above options
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  const p = await page.authenticate({ 'username': 'Admin', 'password': '87737769' });

  const version = await page.browser().version();
  console.log('Chrome version ' + version)

  try {
    await page.goto(url);
    ping = true;
  } catch (e) {
    console.log('ping Charger catch ' + e)
  }

  await browser.close();
  return ping
}

module.exports = {
  changeChargingAmperage: (newAmp) => {

    newAmperage = newAmp
    return changeChargingAmperage();
  },
  pingCharger
}
