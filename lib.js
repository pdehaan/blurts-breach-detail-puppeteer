const axios = require("axios");

module.exports = {
  getBreaches,
  scrapePage
};

async function getBreaches(domain = "https://monitor.firefox.com/") {
  const href = new URL("/hibp/breaches", domain).href;
  const breaches = await axios.get(href);
  return breaches.data;
}

async function scrapePage(page, href, name) {
  console.log(`Fetching "${href}"`);
  await page.goto(href);
  await page.screenshot({ path: name });
}
