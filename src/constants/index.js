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
  chainId: 42161,
  genesisAddress: "0x92B50A816A2ff5D10d6654260d296aC318B647A8",

  sushiTokenAddress: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
  wethTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  arbTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  ethLevelLpTokenAddress: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
  usdcTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  usdtTokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  daiTokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",

  sushiEACAggregatorProxyAddress: "0xb2a8ba74cbca38508ba1632761b56c897060147c",
  wethEACAggregatorProxyAddress: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  arbEACAggregatorProxyAddress: "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6",
  
  ethLevelLpBoardRoomAddress: "0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D",
  tokenIndexList : {
    WETH_INDEX: 0,
    SUSHI_INDEX: 1,
    ARB_INDEX: 2,
    USDC_INDEX: 3,
    USDT_INDEX: 4,
    DAI_INDEX: 5,
    ETHLEVEL_INDEX: 6
  }
}
const MainnetAddresses = {
  chainId: 42161,
  genesisAddress: "0x92B50A816A2ff5D10d6654260d296aC318B647A8",

  sushiTokenAddress: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
  wethTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  arbTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  ethLevelLpTokenAddress: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
  usdcTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  usdtTokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  daiTokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",

  sushiEACAggregatorProxyAddress: "0xb2a8ba74cbca38508ba1632761b56c897060147c",
  wethEACAggregatorProxyAddress: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  arbEACAggregatorProxyAddress: "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6",
  
  ethLevelLpBoardRoomAddress: "0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D",
  tokenIndexList : {
    WETH_INDEX: 0,
    SUSHI_INDEX: 1,
    ARB_INDEX: 2,
    USDC_INDEX: 3,
    USDT_INDEX: 4,
    DAI_INDEX: 5,
    ETHLEVEL_INDEX: 6
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
