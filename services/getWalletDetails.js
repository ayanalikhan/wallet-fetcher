const Moralis = require("moralis/node");
const convertToUsd = require("./convertCurrency");

const serverUrl = process.env.SERVER_URL || "https://ohnzvcntkgvv.usemoralis.com:2053/server";
const appId = process.env.APP_ID || "DUGETJeIPnf99Q7wiKDjwvejuN75FNYVy1NPk0hX";
const masterKey = process.env.MASTER_KEY || "MK7c0460urcbo6gkEPVsaJPVnUYkt9Xpf04dr6vO";

async function getWalletDetails(walletAddress) {
    await Moralis.start({ serverUrl, appId, masterKey });  // starting moralis server
    const eth_balance = await getBalance(walletAddress); // Getting ether balance of wallet
    const usd_balance = await convertToUsd(eth_balance); // Getting USD equivalent of eth
    const tokens = await getTokens(walletAddress); // Geting positions
    const transactions = await getTransactions(walletAddress); // Getting transactions
    return { eth_balance, usd_balance, tokens, transactions }
}

async function getBalance(walletAddress) {
    const options = {
        address: walletAddress,
    };
    const balance = await Moralis.Web3API.account.getNativeBalance(options);
    return Moralis.Units.FromWei(balance.balance);   // Converting the balance from wei to ether 

}
async function getTokens(walletAddress) {
    const tokens = await Moralis.Web3.getAllERC20({ address: walletAddress });
    var formated_result = tokens.map(token => (  
        { name: token.name, symbol: token.symbol, quantity: token.balance / Math.pow(10, token.decimals) }  //Formatting the tokens data
    ));
    return formated_result;
}

async function getTransactions(walletAddress) {
    const options = {
        address: walletAddress,
        order: "desc",
    };
    const transactions = await Moralis.Web3API.account.getTransactions(options);   // Fetching all Transactions
    return transactions.result;
}

module.exports = getWalletDetails;