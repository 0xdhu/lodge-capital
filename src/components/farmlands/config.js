import { 
    ContractAddressList, 
    ShareRewardPoolABI, 
    BUSDABI, 
    ChainlinkFEEDABI, 
    DeadAddress 
} from "@/constants/index.js";

const {
  shareRewardPoolAddress,
  sushiTokenAddress,
  arbEACAggregatorProxyAddress,
  chainId
} = ContractAddressList;

const commonDepositConfig = {
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "deposit",
    chainId,
    args: [0, 0], // _pid, _amount
}
  
const commonPendingReadConfig = {
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "pendingShare",
    chainId,
    args: [1, DeadAddress] // tempaddress
}
  
const commonTVLReadConfig = {
    address: sushiTokenAddress, // tempaddress
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId,
    args: [shareRewardPoolAddress]
}

const commonUserTokenReadConfig = {
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "userInfo",
    chainId,
    args: [1, DeadAddress],
}

const commonTokenAllocReadConfig = {
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
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