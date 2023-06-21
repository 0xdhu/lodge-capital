const DuesPresaleABI = require("@/constants/DuesPresaleABI.json");
const AggregatorABI = require("@/constants/aggregatorABI.json");
const BoardRoomABI = require("@/constants/BoardRoomABI.json");
const BUSDABI = require("@/constants/BUSDABI.json");
const ChainlinkFEEDABI = require("@/constants/ChainlinkFEEDABI.json");
const ClaimLevelABI = require("@/constants/ClaimLevelABI.json");
const GenesisABI = require("@/constants/GenesisABI.json");
const LevelPresaleABI = require("@/constants/LevelPresaleABI.json");
const ShareRewardPoolABI = require("@/constants/ShareRewardPoolABI.json");
const SLPABI = require("@/constants/SLPABI.json");
const TreasuryABI = require("@/constants/TreasuryABI.json");
const WildCardABI = require("@/constants/WildCardABI.json");
const ZapABI = require("@/constants/zapABI.json");

const TestnetAddresses = {
  chainId: 421613,

  sushiTokenAddress: "0x9d04BB167128450cc96eE500d38499D0168f115F",
  wethTokenAddress: "0xee01c0cd76354c383b8c7b4e65ea88d00b06f36f",
  arbTokenAddress: "0xF2B1b971E7055e0bE6dA68997808bd55dA5780d4",
  usdcTokenAddress: "0x8Dc712b3D176d81cDCb35dec1dD9bfcEb86370a4",
  usdtTokenAddress: "0x4DCD6cc633456B174613eDA0e462E02Ac2e8f459",
  daiTokenAddress: "0xbb493df66707cc99FC7a986e07888c7A0934D507",

  levelTokenAddress: "0x7C9d6a30FeC4Cc0C2271634BA928B507Fb901a24",
  lodgeTokenAddress: "0x3D42ec930632AC4A698114BAC715636f185FC427",

  // LEVEL and WETH LP address
  ethLevelLpTokenAddress: "0x5ff43b0dBaD9e55069F77aF338154Ed2D61b1ae2",
  // LODGE and WETH LP address
  ethLodgeLpTokenAddress: "0x9f70C11d62f09Ad0b51623c37d49d34aE160f251",

  sushiEACAggregatorProxyAddress: "0x2eE9BFB2D319B31A573EA15774B755715988E99D", // Not exist for goerli
  wethEACAggregatorProxyAddress: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
  arbEACAggregatorProxyAddress: "0x2eE9BFB2D319B31A573EA15774B755715988E99D",
  
  treasuryAddress: "0xafC562f6287854b097A44786A2E819B12548cbFE",
  boardRoomAddress: "0xA5ae5E77EaC1bf534997C332314aE0919Cd9be1A",
  // GENESIS Reward POOL
  genesisRewardPoolAddress: "0x7713C79D7Ea532E8bd871b7773f435B903c73Ad5",
  // Share Reward POOL
  shareRewardPoolAddress: "0x90f5C7fEe5c147a1A47503Acc32aCE2237B171a8",
  // Zapper
  zapperAddress: "0x7F93A3899006B99783CB089717488ac6223FD203",

  lodgePerSecond: 0.0009384384,
  levelPerSecond: 0.77159722222,

  genesisTokenIndexList : {
    WETH_INDEX: 0,
    SUSHI_INDEX: 1,
    ARB_INDEX: 2,
    USDC_INDEX: 3,
    USDT_INDEX: 4,
    DAI_INDEX: 5,
    ETHLEVEL_INDEX: 6
  },

  farmlandTokenIndexList : {
    ETHLEVEL_INDEX: 0,
    ETHLODGE_INDEX: 1,
    LEVEL_INDEX: 2
  }
}
const MainnetAddresses = {
  chainId: 42161,

  sushiTokenAddress: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
  wethTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  arbTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  usdcTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  usdtTokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  daiTokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",

  levelTokenAddress: "0x0E5c5De023fe05aD4858714E0f58b0cB98718b1D",
  lodgeTokenAddress: "0xa8d9d5e9eae0b44edc30b5d302f018f252d9ceb7",

  // LEVEL and WETH LP address
  ethLevelLpTokenAddress: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
  // LODGE and WETH LP address
  ethLodgeLpTokenAddress: "0xc40d7d423d788eeecd801b634480a86596388c65",

  sushiEACAggregatorProxyAddress: "0xb2a8ba74cbca38508ba1632761b56c897060147c",
  wethEACAggregatorProxyAddress: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  arbEACAggregatorProxyAddress: "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6",
  
  treasuryAddress: "0xE058027ED5a2a15eAfBdb798d46B29bB3257B34D",
  boardRoomAddress: "0x4d6316e252BB639EC17488251375E6E1f905fE4D",
  // GENESIS Reward POOL
  genesisRewardPoolAddress: "0x92B50A816A2ff5D10d6654260d296aC318B647A8",
  // Share Reward POOL
  shareRewardPoolAddress: "0x6a8d3350faC7114de8a69333A88f2bD68A43C19E",
  // Zapper
  zapperAddress: "0x3aafFE95264FCe0A17B9bc457c43B4F7BA2F74A5",

  lodgePerSecond: 0.0009384384,
  levelPerSecond: 0.77159722222,

  genesisTokenIndexList : {
    WETH_INDEX: 0,
    SUSHI_INDEX: 1,
    ARB_INDEX: 2,
    USDC_INDEX: 3,
    USDT_INDEX: 4,
    DAI_INDEX: 5,
    ETHLEVEL_INDEX: 6
  },

  farmlandTokenIndexList : {
    ETHLEVEL_INDEX: 0,
    ETHLODGE_INDEX: 1,
    LEVEL_INDEX: 2
  }
}
const ContractAddressList = process.env.NEXT_PUBLIC_APP_ENV === "testnet"? TestnetAddresses : MainnetAddresses;

module.exports = {
  DuesPresaleABI,
  AggregatorABI,
  BoardRoomABI,
  BUSDABI,
  ChainlinkFEEDABI,
  ClaimLevelABI,
  GenesisABI,
  LevelPresaleABI,
  ShareRewardPoolABI,
  SLPABI,
  TreasuryABI,
  WildCardABI,
  ZapABI,
  ContractAddressList,
  DeadAddress: "0x000000000000000000000000000000000000dead"
};
