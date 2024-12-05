import { MAX_MULTISWAP_AMOUNT, MIN_MULTISWAP_AMOUNT, PROVIDER } from "./utils/config";
import { ethers } from "ethers";
import { getRandomAmountMultiswap, getRandomToken, loadFileLines, log } from "./utils/helpers";
import { swapTokens } from "./swapTokens";
import { claimTokens } from "./getTokens";

const proxies = loadFileLines("data/proxies.txt");
const privateKeys = loadFileLines("data/private_keys.txt");

const startBot = async () => {
    log.info("Starting swapping and claiming tokens...");

    if (privateKeys.length > proxies.length) {
        log.error("Error: incorrect proxies or private keys.");
        return;
    }

    for (let i = 0; i < proxies.length; i++) {
        const proxy = proxies[i];
        const privateKey = privateKeys[i];
        const wallet = new ethers.Wallet(privateKey, PROVIDER);

        log.start(wallet.address);

        await claimTokens(privateKey, proxy, "Sonic");

        for (let j = 0; j < 4; j++) {
            const amountMultiswaps = getRandomAmountMultiswap();

            let tokenIn = getRandomToken();

            const result = await claimTokens(privateKey, proxy, tokenIn);
            if (result.includes("too many request")) break;

            for (let k = 0; k < amountMultiswaps; k++) {
                let tokenOut = getRandomToken();
                
                while (tokenIn === tokenOut) tokenOut = getRandomToken();

                await swapTokens(wallet, tokenIn, tokenOut);
                tokenIn = tokenOut;
            }
        }
    }

    log.success("Swapping and claiming tokens completed successfully!");
};

startBot();