const axios = require('axios');

const apiKey = "secret";

async function covertToUsd(eth_balance) {
    const config = {
        method: 'get',
        url: `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${apiKey}`
    }
    let res = await axios(config); // FETCHING ETH -> USD RATE
    return eth_balance * res.data.USD;  // Converting ETH to equivalet USD
}

module.exports = covertToUsd;
