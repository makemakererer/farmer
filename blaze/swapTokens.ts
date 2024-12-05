import { ethers } from "ethers";
import { randomDelay, truncateAddress, getRandomTokensAmount, generateData, log } from "./utils/helpers";
import { TOKEN_ADDRESSES, TOKENS_PAIR_CONTRACTS, ROUTER_ADDRESS, MIN_DELAY_BETWEEN_SWAPS, MAX_DELAY_BETWEEN_SWAPS } from "./utils/config";

export const swapTokens = async (wallet: ethers.Wallet, tokenIn: string, tokenOut: string, retries: number = 2): Promise<void> => {
    const walletForLogging = truncateAddress(wallet.address);

    const tokenInAddress = TOKEN_ADDRESSES[tokenIn as keyof typeof TOKEN_ADDRESSES];
    const tokenOutAddress = TOKEN_ADDRESSES[tokenOut as keyof typeof TOKEN_ADDRESSES];

    let pairContractAddress = TOKENS_PAIR_CONTRACTS[`${tokenIn}${tokenOut}` as keyof typeof TOKENS_PAIR_CONTRACTS];
    if (!pairContractAddress) pairContractAddress = TOKENS_PAIR_CONTRACTS[`${tokenOut}${tokenIn}` as keyof typeof TOKENS_PAIR_CONTRACTS];

    const amountTokenIn = await getRandomTokensAmount(tokenInAddress, wallet.address);
    const amountTokenInForLogging = Number(ethers.formatEther(amountTokenIn)).toFixed(3);

    if (amountTokenIn === "0") {
        log.warning(`${walletForLogging} has 0 ${tokenIn} - cannot swap!`)
        return;
    }

    const data = generateData(amountTokenIn, [tokenInAddress, tokenOutAddress], [pairContractAddress]);

    const tx = {
        to: ROUTER_ADDRESS,
        data: data,
    };

    await randomDelay(MIN_DELAY_BETWEEN_SWAPS, MAX_DELAY_BETWEEN_SWAPS);
    try {
        const txResponse = await wallet.sendTransaction(tx);
        const receipt = await txResponse.wait();
        
        if (receipt?.status === 1) {
            log.success(`Swap between ${tokenIn} and ${tokenOut} was successful for ${walletForLogging} with amount ${amountTokenInForLogging}`);
        } else {
            if (retries > 0) {
                log.warning(`Swap between ${tokenIn} and ${tokenOut} failed for ${walletForLogging}, retrying...`)
                return await swapTokens(wallet, tokenIn, tokenOut, retries - 1);
            } else {
                log.error(`Swap between ${tokenIn} and ${tokenOut} failed for ${walletForLogging}`)
            }
        }
    } catch (error) {
        if (retries > 0) {
            log.warning(`Swap between ${tokenIn} and ${tokenOut} failed for ${walletForLogging}. Retrying...`)
            return await swapTokens(wallet, tokenIn, tokenOut, retries - 1);
        } else {
            log.error(`Swap between ${tokenIn} and ${tokenOut} failed for ${walletForLogging}`)
        }
    }
}