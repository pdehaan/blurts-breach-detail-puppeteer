const axios = require("axios");

module.exports = {
  getBreaches
};

async function getBreaches() {
  const breaches = await axios.get("https://monitor.firefox.com/hibp/breaches");
  return breaches.data;
}
