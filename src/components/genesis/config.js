import { 
    ContractAddressList, 
    GenesisABI, 
    BUSDABI, 
    ChainlinkFEEDABI, 
    DeadAddress 
} from "@/constants/index.js";

const {
  genesisAddress,
  sushiTokenAddress,
  arbEACAggregatorProxyAddress,
  chainId
} = ContractAddressList;

const commonDepositConfig = {
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId,
    args: [0, 0], // _pid, _amount
}
  
const commonPendingReadConfig = {
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId,
    args: [0, genesisAddress]
}
  
const commonTVLReadConfig = {
    address: sushiTokenAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId,
    args: [genesisAddress]
}

const commonUserTokenReadConfig = {
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId,
    args: [0, DeadAddress],
}

const commonTokenAllocReadConfig = {
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId,
    args: [0],
}

const commonPriceLatestAnswerConfig = {
    address: arbEACAggregatorProxyAddress,
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId,
}

module.exports = {
  commonDepositConfig,
  commonPendingReadConfig,
  commonTVLReadConfig,
  commonUserTokenReadConfig,
  commonTokenAllocReadConfig,
  commonPriceLatestAnswerConfig
};