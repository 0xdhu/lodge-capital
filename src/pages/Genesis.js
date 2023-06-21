import Head from "next/head";
// import Image from "next/image";
// import { Inter, Trykker } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
// import Header from "../components/myHeader.jsx";
// import Header1 from "../components/Header.jsx";
// const inter = Inter({ subsets: ["latin"] });
// const logo = require("../images/cake-busd.png");
// const logo1 = require("../images/busd-icon.png");
// const logo2 = require("../images/level-icon.png");
import ExampleHeader from "@/components/thheader.jsx";
// import ExampleModal from "@/components/mymodal.jsx";
// import ExampleB from "@/components/abutton.jsx";
// import ExampleA from "@/components/bbutton.jsx";
import ExampleFF from "@/components/footer.jsx";

// import { Disclosure, Transition } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/20/solid";
import ExampleCA from "@/components/contestAlert.jsx";
import {
  // usePrepareContractWrite,
  // useContractWrite,
  useContractRead,
  // useAccount,
  // useWaitForTransaction,
} from "wagmi";
// import { watchBlockNumber } from "@wagmi/core";
// import DepositModal from "@/components/GenesisPoolModalDeposit.jsx";
// import WithdrawModal from "@/components/GenesisPoolModalWithdraw.jsx";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { Toaster } from "react-hot-toast";
// import NumberFormat from "@/components/NumFormater.jsx";
import { ContractAddressList, SLPABI, GenesisABI, BoardRoomABI, ShareRewardPoolABI, ChainlinkFEEDABI } from "@/constants/index.js";
import useRefreshHook from "@/hook/refresh.jsx"
import GenesisPool from "@/components/genesis/pool.jsx";
import StakingOverview from "@/components/genesis/genesis-overview";
import FarmLandPool from "@/components/farmlands/pool";
const {
  genesisRewardPoolAddress,
  shareRewardPoolAddress,

  sushiTokenAddress,
  wethTokenAddress,
  arbTokenAddress,
  usdcTokenAddress,
  usdtTokenAddress,
  daiTokenAddress,

  levelTokenAddress,

  ethLevelLpTokenAddress,
  ethLodgeLpTokenAddress,
  sushiEACAggregatorProxyAddress,
  wethEACAggregatorProxyAddress,
  arbEACAggregatorProxyAddress,

  // boardRoomAddress,

  genesisTokenIndexList,
  farmlandTokenIndexList,
  chainId: arbChainId
} = ContractAddressList;

const {
  WETH_INDEX,
  SUSHI_INDEX,
  ARB_INDEX,
  USDC_INDEX,
  USDT_INDEX,
  DAI_INDEX,
  ETHLEVEL_INDEX
} = genesisTokenIndexList;

const {
  ETHLEVEL_INDEX: FarmLand_ETHLEVEL_INDEX,
  ETHLODGE_INDEX,
  LEVEL_INDEX
} = farmlandTokenIndexList;

const commonPriceLatestAnswerConfig = {
  address: arbEACAggregatorProxyAddress,
  abi: ChainlinkFEEDABI,
  functionName: "latestAnswer",
  chainId: arbChainId
}

export default function Genesis() {
  const {refreshCount} = useRefreshHook(120000);

  const [totalGenesisAllocation, setTotalGenesisAllocation] = useState(0);
  const [totalFarmLandAllocation, setTotalFarmAllocation] = useState(0);
  // USDT, USDC, DAI is just 1$
  const [levelPriceInETH, setLevelPriceInETH] = useState(0);
  const [lodgePriceInETH, setLodgePriceInETH] = useState(0);

  const [ethPrice, setEthPrice] = useState(0);
  const [arbPrice, setArbPrice] = useState(0);
  const [sushiPrice, setSushiPrice] = useState(0);

  // ETH/Level
  const [ethLevelLpPoolValueInETH, setETHLevelLpPoolValueInETH] = useState(0);
  const [ethLevelLpPrice, setETHLevelLpPrice] = useState(0);
  const [ethLevelLpSupply, setETHLevelLpSupply] = useState(0);

  // ETH/Lodge
  const [ethLodgeLpPoolValueInETH, setETHLodgeLpPoolValueInETH] = useState(0);
  const [ethLodgeLpPrice, setETHLodgeLpPrice] = useState(0);
  const [ethLodgeLpSupply, setETHLodgeLpSupply] = useState(0);

  //-- Prices from BoardRoom
  // const { refetch: levelPriceReadRefetch } = useContractRead({
  //   address: boardRoomAddress,
  //   abi: BoardRoomABI,
  //   functionName: "getNativePrice",
  //   chainId: arbChainId,
  //   onSuccess(levelPriceData) {
  //     const read19 = (levelPriceData || 0).toString();
  //     const newLevelPriceInETH = ethers.utils.formatEther(read19);
  //     if (levelPriceInETH !== newLevelPriceInETH) {
  //       setLevelPriceInETH(newLevelPriceInETH);
  //     }
  //   },
  // });

  // const { refetch: lodgePriceReadRefetch } = useContractRead({
  //   address: boardRoomAddress,
  //   abi: BoardRoomABI,
  //   functionName: "getNativePrice",
  //   chainId: arbChainId,
  //   onSuccess(lodgePriceData) {
  //     const read19 = (lodgePriceData || 0).toString();
  //     const newLevelPriceInETH = ethers.utils.formatEther(read19);
  //     if (levelPriceInETH !== newLevelPriceInETH) {
  //       setLevelPriceInETH(newLevelPriceInETH);
  //     }
  //   },
  // });

  const { refetch: ethPriceReadRefetch } = useContractRead({
    ...commonPriceLatestAnswerConfig,
    address: wethEACAggregatorProxyAddress,   
    onSuccess(ethPriceData) {
      const read19 = (ethPriceData || 0).toString();
      const newEthPrice = ethers.utils.formatUnits(read19, 8); // oracle price has 1e8
      if (ethPrice !== newEthPrice) {
        setEthPrice(newEthPrice);
      }
    }, 
  });
  const { refetch: arbPriceReadRefetch } = useContractRead({
    ...commonPriceLatestAnswerConfig,
    address: arbEACAggregatorProxyAddress,
    onSuccess(arbPriceData) {
      const read19 = (arbPriceData || 0).toString();
      const newArbPrice = ethers.utils.formatUnits(read19, 8);
      if (arbPrice !== newArbPrice) {
        setArbPrice(newArbPrice);
      }
    }, 
    
  });
  const { refetch: sushiPriceReadRefetch } = useContractRead({
    ...commonPriceLatestAnswerConfig,
    address: sushiEACAggregatorProxyAddress,
    onSuccess(sushiPriceData) {
      const read19 = (sushiPriceData || 0).toString();
      let newSushiPrice = ethers.utils.formatUnits(read19, 8);
      if (process.env.NEXT_PUBLIC_APP_ENV === "testnet") {
        newSushiPrice = newSushiPrice * 0.56;
      }
      if (sushiPrice !== newSushiPrice) {
        setSushiPrice(newSushiPrice);
      }
    }, 
  });

  // LP info
  const { refetch: ethLevelLpReservesReadRefetch } = useContractRead({
    address: ethLevelLpTokenAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: arbChainId,
    onSuccess(data) {
      const levelAmount = data[0] || 0; // WETH amount
      const wethAmount = data[1] || 0; // WETH amount
      if (wethAmount > 0) {
        const newLevelPriceInETH = levelAmount / wethAmount;
        if (levelPriceInETH !== newLevelPriceInETH) {
          setLevelPriceInETH(newLevelPriceInETH);
        }
      }

      const mul = wethAmount * 2;
      const newLpPoolValue = ethers.utils.formatEther(mul.toString())
      if (ethLevelLpPoolValueInETH !== newLpPoolValue) {
        setETHLevelLpPoolValueInETH(newLpPoolValue); // LP token price in terms of ETH
      }
    },
  });
  const { refetch: ethLevelLpSupplyReadRefetch } = useContractRead({
    address: ethLevelLpTokenAddress,
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: arbChainId,

    onSuccess(data) {
      const read24 = data;
      const newLpSupply = ethers.utils.formatEther(read24.toString());
      if (ethLevelLpSupply !== newLpSupply) {
        setETHLevelLpSupply(newLpSupply);
      }
    },
  });

  // ETH/LODGE
  const { refetch: ethLodgeLpReservesReadRefetch } = useContractRead({
    address: ethLodgeLpTokenAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: arbChainId,
    onSuccess(data) {
      const lodgeAmount = data[0] || 0; // WETH amount
      const wethAmount = data[1] || 0; // WETH amount
      if (wethAmount > 0) {
        const newLodgePriceInETH = lodgeAmount / wethAmount;
        if (lodgePriceInETH !== newLodgePriceInETH) {
          setLodgePriceInETH(newLodgePriceInETH);
        }
      }

      const mul = wethAmount * 2;
      const newLpPoolValue = ethers.utils.formatEther(mul.toString())
      if (ethLodgeLpPoolValueInETH !== newLpPoolValue) {
        setETHLodgeLpPoolValueInETH(newLpPoolValue); // LP token price in terms of ETH
      }
    },
  });
  const { refetch: ethLodgeLpSupplyReadRefetch } = useContractRead({
    address: ethLodgeLpTokenAddress,
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: arbChainId,

    onSuccess(data) {
      const read24 = data;
      const newLpSupply = ethers.utils.formatEther(read24.toString());
      if (ethLodgeLpSupply !== newLpSupply) {
        setETHLodgeLpSupply(newLpSupply);
      }
    },
  });


  useEffect(() => {
    if (ethLevelLpSupply > 0) {
      const lpPrice = ethLevelLpPoolValueInETH * ethPrice / ethLevelLpSupply;
      setETHLevelLpPrice(lpPrice);
    }
  }, [ethLevelLpPoolValueInETH, ethLevelLpSupply, ethPrice])

  useEffect(() => {
    if (ethLodgeLpSupply > 0) {
      const lodgePrice = ethLodgeLpPoolValueInETH * ethPrice / ethLodgeLpSupply;
      setETHLodgeLpPrice(lodgePrice);
    }
  }, [ethLodgeLpPoolValueInETH, ethLodgeLpSupply, ethPrice])


  const { refetch: totalGenesisAllocReadRefetch } = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "totalAllocPoint",
    chainId: arbChainId,

    onSuccess(data) {
      const totallcread0 = (data || 0).toString();
      if (totallcread0 !== totalGenesisAllocation) {
        setTotalGenesisAllocation(totallcread0);
      }
    },
  });

  const { refetch: totalFarmLandAllocReadRefetch } = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "totalAllocPoint",
    chainId: arbChainId,

    onSuccess(data) {
      const totallcread0 = (data || 0).toString();
      if (totallcread0 !== totalFarmLandAllocation) {
        setTotalFarmAllocation(totallcread0);
      }
    },
  });


  // const unwatch = watchBlockNumber(
  //   {
  //     chainId: arbChainId,
  //   },
  //   (blockNumber) => console.log(blockNumber)
  // );

  async function updateUI() {
    // Price, ETHLEVEL, SUSHI, ARB, WEH
    // levelPriceReadRefetch();
    ethPriceReadRefetch();
    arbPriceReadRefetch();
    sushiPriceReadRefetch();
    // LP
    ethLevelLpReservesReadRefetch();
    ethLevelLpSupplyReadRefetch();
    ethLodgeLpReservesReadRefetch();
    ethLodgeLpSupplyReadRefetch();
    // Total Alloc
    totalGenesisAllocReadRefetch();
    totalFarmLandAllocReadRefetch();
  }
  useEffect(() => {
    if (refreshCount > 0) {
      updateUI();
    }
  }, [refreshCount]); // unwatch

  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Lodge Capital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen font-Montserrat">
        <ExampleHeader />
        <ExampleCA />
        <StakingOverview 
          levelPriceInEth={levelPriceInETH}
          lodgePriceInEth={lodgePriceInETH}
          ethPrice={ethPrice}
        />
        <GenesisPool // WETH
          refresh={refreshCount}
          tokenName={"WETH"}
          tokenAddress={wethTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={WETH_INDEX}
          tokenDecimal={18}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={ethPrice}
        />
        <GenesisPool // Sushi
          refresh={refreshCount}
          tokenName={"SUSHI"}
          tokenAddress={sushiTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908734670147644/sSUSHI.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={SUSHI_INDEX}
          tokenDecimal={18}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={sushiPrice}
        />
        <GenesisPool // Arbitrum
          refresh={refreshCount}
          tokenName={"ARB"}
          tokenAddress={arbTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105909574810222773/sARB.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={ARB_INDEX}
          tokenDecimal={18}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={arbPrice}
        />
        <GenesisPool // USDC
          refresh={refreshCount}
          tokenName={"USDC"}
          tokenAddress={usdcTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908735139917977/sUSDC.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={USDC_INDEX}
          tokenDecimal={6}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={1}
        />
        <GenesisPool // USDT
          refresh={refreshCount}
          tokenName={"USDT"}
          tokenAddress={usdtTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908735794225262/sUSDT.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={USDT_INDEX}
          tokenDecimal={6}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={1}
        />
        <GenesisPool // DAI
          refresh={refreshCount}
          tokenName={"DAI"}
          tokenAddress={daiTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908731708977272/sDAI.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={DAI_INDEX}
          tokenDecimal={18}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={1}
        />

        <GenesisPool // ETH/LEVEL
          refresh={refreshCount}
          tokenName={"ETH/LEVEL"}
          tokenAddress={ethLevelLpTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          lpGifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"}
          nativePrice={levelPriceInETH}
          ethPrice={ethPrice}
          tokenIndex={ETHLEVEL_INDEX}
          tokenDecimal={18}
          totalAllocation={totalGenesisAllocation}
          tokenPrice={ethLevelLpPrice}
        />

        {/* FarmLand */}
        <FarmLandPool // ETH/LEVEL
          refresh={refreshCount}
          tokenName={"ETH/LEVEL"}
          tokenAddress={ethLevelLpTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          lpGifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"}
          nativePrice={lodgePriceInETH}
          ethPrice={ethPrice}
          tokenIndex={FarmLand_ETHLEVEL_INDEX}
          tokenDecimal={18}
          totalAllocation={totalFarmLandAllocation}
          tokenPrice={ethLevelLpPrice}
        />

        {/* FarmLand */}
        <FarmLandPool // ETH/LODGE
          refresh={refreshCount}
          tokenName={"ETH/LODGE"}
          tokenAddress={ethLodgeLpTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          lpGifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"}
          nativePrice={lodgePriceInETH}
          ethPrice={ethPrice}
          tokenIndex={ETHLODGE_INDEX}
          tokenDecimal={18}
          totalAllocation={totalFarmLandAllocation}
          tokenPrice={ethLodgeLpPrice}
        />

        {/* FarmLand */}
        <FarmLandPool // LEVEL
          refresh={refreshCount}
          tokenName={"LEVEL"}
          tokenAddress={levelTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"}
          nativePrice={lodgePriceInETH}
          ethPrice={ethPrice}
          tokenIndex={LEVEL_INDEX}
          tokenDecimal={18}
          totalAllocation={totalFarmLandAllocation}
          tokenPrice={levelPriceInETH * ethPrice}
        />
        <span> {"   "}</span>
        <span> {"   "}</span>
        <span> {"   "}</span>
        <span> {"   "}</span>
        <div> {"  "}</div>
        <Toaster />
        <span> {"   "}</span>
        <ExampleFF />
      </main>
    </>
  );
}
