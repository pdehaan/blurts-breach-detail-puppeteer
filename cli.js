const puppeteer = require('puppeteer');

const lib = require("./lib");

main("https://fx-breach-alerts.herokuapp.com/");

async function main(domain="https://monitor.firefox.com") {
  const breaches = await lib.getBreaches();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const breach of breaches) {
    await scrapePage(page, breach.Name, domain);
    // console.log(`Fetching "${href}"`);
    // await page.goto(href);
    // await page.screenshot({path: `./shots/${breach.Name}.png`});
  }
  await browser.close();
  process.exit();
}

async function scrapePage(page, name, domain) {
  const href = new URL(`/breach-details/${name}`, domain).href;
  console.log(`Fetching "${href}"`);
  await page.goto(href);
  await page.screenshot({path: `./shots/${name}.png`});
}
