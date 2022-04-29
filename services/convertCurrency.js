const axios = require('axios');

const apiKey = "dcd24c93ae2ecfdc3498a53b1e564987063361122406a9e0006587ea4fe9a518";

async function covertToUsd(eth_balance) {
    const config = {
        method: 'get',
        url: `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${apiKey}`
    }
    let res = await axios(config); // FETCHING ETH -> USD RATE
    return eth_balance * res.data.USD;  // Converting ETH to equivalet USD
}

module.exports = covertToUsd;