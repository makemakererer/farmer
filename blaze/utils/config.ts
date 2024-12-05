import { JsonRpcProvider } from "ethers";

export const PROVIDER = new JsonRpcProvider("https://rpc.blaze.soniclabs.com", {
    name: 'Sonic Blaze Testnet',
    chainId: 57054,
});


// 50% - 90% of the balance
// ! cannot be 0 and more than 1003
export const MIN_AMOUNT_TO_SWAP = 0.5;
export const MAX_AMOUNT_TO_SWAP = 0.9;

//! delays in seconds
export const MIN_DELAY_BETWEEN_SWAPS = 2;
export const MAX_DELAY_BETWEEN_SWAPS = 10;

export const MIN_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS = 4;
export const MAX_DELAY_BETWEEN_REQUESTS_GETTING_TOKENS = 7;

export const MIN_DELAY_BETWEEN_ACCOUNTS = 5;
export const MAX_DELAY_BETWEEN_ACCOUNTS = 10;

export const TOKENS_TO_CLAIM = ["Coral", "Diamond", "Fluorite", "Malachite", "Obsidian", "Onyx", "Opal", "Quartz", "Ruby", "Topaz"];

export const BALANCE_OF_ABI = "function balanceOf(address) view returns (uint256)";

export const ROUTER_ADDRESS = "0x086d426f8b653b88a2d6d03051c8b4ab8783be2b";

export const TOKEN_ADDRESSES = {
    Coral: "0xAF93888cbD250300470A1618206e036E11470149",
    Diamond: "0x30BF3761147Ef0c86E2f84c3784FBD89E7954670",
    Fluorite: "0x9Fa14D267d331c9E8BB7979bcDC212136915eCE8",
    Malachite: "0x50971F8978C431D560ff658a83a8a03fdf199055",
    Obsidian: "0x3e6eE2F3f33766294C7148bc85c7d145E70cBD9A",
    Onyx: "0xE73c4f6A0A3B0EF8337fD080b76C08172b3eB958",
    Opal: "0xdB9a47bB64961E1eE511CB8aB252e6102a1b956C",
    Quartz: "0x36c420131BC14079C01d12D2EA54E05256C42DEf",
    Ruby: "0x75190d6e62B8984b987B2336fD10552eD0e6a538",
    Topaz: "0x72778BA7c44b3bF218954175A9480D8b8f841C08"
}

export const TOKENS_PAIR_CONTRACTS = {
    CoralDiamond: "0x908562F2aCA4d9bd0370fc7Bd0d2FDF59395082c",
    CoralFluorite: "0x9AC299a45C7E70AF47FBDc062ECA5DCc04a48f0c",
    CoralMalachite: "0xf88e70B3E1f848c55781297329093E8B15969908",
    CoralObsidian: "0xD7D04d8A33b6E6EB42a2e0e273e0fe1F23f818fD",
    CoralOnyx: "0x7D5bE487743F73264D6aA4Ae202B6103078cD1a8",
    CoralOpal: "0x9540714aB1F26c0d920BE704214638A59760ff47",
    CoralQuartz: "0xd6ccb9c7B4164B5d02226407445aCE75e90E0b6C",
    CoralRuby: "0x46c12c3b0b0221e2b30930Bf17C3564ba8720C56",
    CoralTopaz: "0x0DB7087E050EF022ec1D0432E983fF42506CC990",
    DiamondFluorite: "0xB5c77317B8E98347ceA20752317e8237063E888c",
    DiamondMalachite: "0x92e668fFF2054d9A1C77cc0489F1EcdA5928696c",
    DiamondObsidian: "0x19Ca461273989efF78C466c4B566AA0735113684",
    DiamondOnyx: "0xAa632eB9745B85fD2B232F103c95da6AF1CAb537",
    DiamondOpal: "0x52930aB1B8b3692C189e1C711f5A9e6b19416c5e",
    DiamondQuartz: "0x9785F7336CcFDd863FFC8179761f51f81E45BDf4",
    DiamondRuby: "0xb0461317F316622b937e780c7360981ae93BE090",
    DiamondTopaz: "0x3a492092eb98E5a9709F26D55aa2402D8dF580cb",
    FluoriteMalachite: "0x320735781186141922D6852cB8a4e68AedB58601",
    FluoriteObsidian: "0x944c01d0AED2F4d8C92141C3087f4f93A37d811E",
    FluoriteOnyx: "0x2b7498C2BE86775Af30686e156326aBc7b94B105",
    FluoriteOpal: "0x8d36c19a5CEa2310F23d4B775ba663E16B994cAB",
    FluoriteQuartz: "0x6FdA3dF774c49db49171FA1856bD5081205eCAa2",
    FluoriteRuby: "0x1812a637618ABa2Fd0565226C056F0053a49c3aB",
    FluoriteTopaz: "0xCE86c8D81D24DCFe54d29409aFeFfde81852B8Ad",
    MalachiteObsidian: "0xF29B3d06771d1886E0507c9d5093Df231bC1473B",
    MalachiteOnyx: "0x72E9130B3400Ce71de271a0f3d9d08909CCBBA54",
    MalachiteOpal: "0xaEAF7a3Ec36B69150F779Ff015cAb34fE1432CEf",
    MalachiteQuartz: "0xD6a33a354B1C0793Aca3E88DF86b79ffeA400a41",
    MalachiteRuby: "0x101018caB82Ef0a66698071Ca4A5ABE1a9c20F4C",
    MalachiteTopaz: "0x28ecC5BaCadf35264888BF41Fc51Ce3b087f8cbB",
    ObsidianOnyx: "0xCE1c63381b03bd5f227C1cCfa71c5E93154f336F",
    ObsidianOpal: "0x949d1B0312Aa5f640Ab49C632193ee0243027997",
    ObsidianQuartz: "0x8EF89856cc69db12cc2F6a9ee83cb95Ed2Aa8766",
    ObsidianRuby: "0xB7fAdAC64512593feFD8AFd7c0B22D9f9FD5a99C",
    ObsidianTopaz: "0xD63f3f421F89C555453489CCf16Bfd6Ef7A89C6d",
    OnyxOpal: "0x00A5874C0b728704ACEc8603128E5C2186668f1E",
    OnyxQuartz: "0x21D2Dc22b6648367a06d9Ccd77B8E27DE28bD8ea",
    OnyxRuby: "0x1e3d419043cBdA7139f0bDadC11727328D94984d",
    OnyxTopaz: "0x4726D8e605C25988038dE0D11D67F0BA90F1fB8e",
    OpalQuartz: "0x59A3aE3b6e6b72446320Cdb859AA643C79011a1f",
    OpalRuby: "0xE7b285131316D5B3D3B88596443254936740a677",
    OpalTopaz: "0x3a86308298D091Ef219DADb1b703095a4588Af65",
    QuartzRuby: "0x0DA65E03cf08B43d3D4e653dBA597228dD46E6d3",
    QuartzTopaz: "0x70B18169900C6259DeB0A931a5b9b1871E69801E",
    RubyTopaz: "0xB56de8F6b4B18BB911DA14251544AB28b1a22a39"
}

export const REQUEST_TOKENS_MUTATION = `
  mutation RequestTokens($symbol: String) {
    requestTokens(symbol: $symbol)
  }
`;

export const CLAIM_TOKENS_MUTATION = `
  mutation ClaimTokens($address: Address!, $challenge: String!, $signature: String!, $erc20Address: Address) {
    claimTokens(address: $address, challenge: $challenge, signature: $signature, erc20Address: $erc20Address)
  }
`;