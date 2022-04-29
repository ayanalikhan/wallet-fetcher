getWalletDetails = require('./services/getWalletDetails');

const main = async () => {
    const arguments = process.argv;
    const walletAddress = arguments[2];  // Expecting the wallet address to be 2 param in running script [ npm start --wallet xyz ]
    if (!!walletAddress) {
        try {
            const result = await getWalletDetails(walletAddress);
            console.log(result);
        }
        catch {
            console.log("Oops! Something went wrong..")
        }
    }
}

main()
