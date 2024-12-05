import { ethers } from "ethers";
import { createApiClient, randomDelay, truncateAddress, log } from "./utils/helpers";
import { CLAIM_TOKENS_MUTATION, MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, REQUEST_TOKENS_MUTATION, TOKEN_ADDRESSES } from "./utils/config";

export const claimTokens = async (privateKey: string, proxy: string, token: string = "Sonic", retries: number = 2): Promise<string> => {
    const wallet = new ethers.Wallet(privateKey);
    const walletForLogging = truncateAddress(wallet.address);
    const baseURL = "https://api.blaze.soniclabs.com/";

    try {
        const apiClient = createApiClient(baseURL, proxy);

        const requestTokenResponse = await apiClient.post("/", {
            query: REQUEST_TOKENS_MUTATION,
            variables: { symbol: token },
        });

        if (requestTokenResponse.data.errors) {
            const errorMessage = requestTokenResponse.data.errors[0].message;
            if (errorMessage.includes("too many requests")) {
                log.error(`Too many requests for ${token} for wallet: ${walletForLogging}`);
                await randomDelay(MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS);
                return "too many request";
            }
            throw new Error(errorMessage);
        }
        await randomDelay(MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS);

        const challengeMessage = requestTokenResponse.data.data.requestTokens;
        const signature = await wallet.signMessage(challengeMessage);
        
        let tokenAddress;
        if (token !== "Sonic") tokenAddress = TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES];

        const claimVariables = {
            address: wallet.address,
            challenge: challengeMessage,
            signature: signature,
            erc20Address: token !== "Sonic" ? TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES] : undefined
        };

        const claimResponse = await apiClient.post("/", {
            query: CLAIM_TOKENS_MUTATION,
            variables: claimVariables,
        });
        await randomDelay(MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS);

        if (claimResponse.data.data.claimTokens === true) {
            log.success(`Successfully claimed ${token} for wallet: ${walletForLogging}`);
            return "success";
        } else {
            const errorMessage = claimResponse.data.errors[0].message;
            throw new Error(errorMessage);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'unknown error';
        if (retries > 0) {
            log.warning(`Failed to claim ${token} for wallet: ${walletForLogging} due ${errorMessage}. Retrying...`);
            await randomDelay(MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS, MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS);
            return await claimTokens(privateKey, proxy, token, retries - 1);
        } else {
            log.error(`Failed to claim ${token} for wallet: ${walletForLogging} due ${errorMessage}`);
            return "error";
        }
    }
};
