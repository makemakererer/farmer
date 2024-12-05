import { ethers } from "ethers";
import { MAX_AMOUNT_TO_SWAP, MAX_MULTISWAP_AMOUNT, MIN_AMOUNT_TO_SWAP, MIN_AMOUNT_TO_SWAP_IN_TOKENS, MIN_MULTISWAP_AMOUNT, PROVIDER, TOKENS_TO_CLAIM } from "./config";
import { ERC20_ABI } from "./ERC20";
import chalk from "chalk";
import { AxiosInstance } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import axios from "axios";
import fs from "fs";

export const getRandomToken = () => {
    return TOKENS_TO_CLAIM[Math.floor(Math.random() * TOKENS_TO_CLAIM.length)];
};

export const generateData = (amount: string, tokens: string[], tokensPairContracts: string[]) => {
    const swapSelector = "0xddba27a7";
    const types = ["uint256", "address[]", "address[]"];
    
    const values = [amount, tokens, tokensPairContracts];
    const encodedArguments = new ethers.AbiCoder().encode(types, values);
    
    const data = swapSelector + encodedArguments.slice(2);
    return data;
}

export const getRandomTokensAmount = async (tokenAddress: string, walletAddress: string) => {
    const ERC20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, PROVIDER);
    const balance = await ERC20Contract.balanceOf(walletAddress);
    
    const balanceNumber = parseFloat(ethers.formatUnits(balance, 18)); 

    const min = balanceNumber * MIN_AMOUNT_TO_SWAP;
    const max = balanceNumber * MAX_AMOUNT_TO_SWAP;

    const randomAmount = Math.random() * (max - min) + min;

    let amountTokensIn = ethers.parseUnits(randomAmount.toFixed(18), 18).toString(); 
	if (Number(randomAmount) < MIN_AMOUNT_TO_SWAP_IN_TOKENS) {
		amountTokensIn = MIN_AMOUNT_TO_SWAP_IN_TOKENS.toString();
	}

    return amountTokensIn;
}

export const getRandomAmountMultiswap = () => {
	const min = MIN_MULTISWAP_AMOUNT;
	const max = MAX_MULTISWAP_AMOUNT;
	const randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomAmount < MIN_MULTISWAP_AMOUNT) {
		return MIN_MULTISWAP_AMOUNT;
	}
	return randomAmount;
}

export const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-7)}`;
};

export const randomDelay = (minSeconds = 1, maxSeconds = 5) => {
	const minMs = minSeconds * 1000;
	const maxMs = maxSeconds * 1000;

	const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

	return new Promise((resolve) => setTimeout(resolve, delay));
};

export const log = {
	start: (walletAddress: string) => console.log(chalk.white(`------------------------------ START WITH ${walletAddress} ------------------------------`)),
	success: (msg: string) => console.log(chalk.green("✅ " + msg)),
	error: (msg: string) => console.log(chalk.red("❌ " + msg)),
	info: (msg: string) => console.log(chalk.blue("✍️  " + msg)),
	warning: (msg: string) => console.log(chalk.yellow("⚠️  " + msg)),
};

export const createApiClient = (baseURL: string, proxy: string): AxiosInstance => {
	const proxyAgent = new HttpsProxyAgent(proxy);
	return axios.create({
		baseURL,
		httpsAgent: proxyAgent,
	});
};

export const loadFileLines = (filePath: string): string[] => {
	return fs
		.readFileSync(filePath, "utf-8")
		.split("\n")
		.map((line: string) => line.trim())
		.filter((line: string) => line);
};
