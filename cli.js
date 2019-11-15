#!/usr/bin/env node

const puppeteer = require("puppeteer");

const lib = require("./lib");

// Scrape freshest logos from the dev site.
main("https://fx-breach-alerts.herokuapp.com/");

async function main(domain = "https://monitor.firefox.com") {
  const breaches = await lib.getBreaches(domain);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const breach of breaches) {
    const href = new URL(`/breach-details/${breach.Name}`, domain).href;
    const shotname = `./shots/${breach.Name}.png`;
    await lib.scrapePage(page, href, shotname);
  }
  await browser.close();
  process.exit();
}
