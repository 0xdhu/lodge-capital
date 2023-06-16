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
import { ContractAddressList, SLPABI, GenesisABI, BoardRoomABI, ChainlinkFEEDABI } from "@/constants/index.js";
import useRefreshHook from "@/hook/refresh.jsx"
import GenesisPool from "@/components/genesis/pool.jsx";
import GenesisOverview from "@/components/genesis/genesis-overview";
const {
  genesisAddress,
  sushiTokenAddress,
  wethTokenAddress,
  arbTokenAddress,
  ethLevelLpTokenAddress,
  usdcTokenAddress,
  usdtTokenAddress,
  daiTokenAddress,

  sushiEACAggregatorProxyAddress,
  wethEACAggregatorProxyAddress,
  arbEACAggregatorProxyAddress,
  ethLevelLpBoardRoomAddress,

  tokenIndexList,
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
} = tokenIndexList;

const commonPriceLatestAnswerConfig = {
  address: arbEACAggregatorProxyAddress,
  abi: ChainlinkFEEDABI,
  functionName: "latestAnswer",
  chainId: arbChainId
}

export default function Masonry() {
  const {refreshCount} = useRefreshHook(120000);

  const [totalAllocation, setTotalAllocation] = useState(0);
  // USDT, USDC, DAI is just 1$
  const [nativePrice, setNativePrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [arbPrice, setArbPrice] = useState(0);
  const [sushiPrice, setSushiPrice] = useState(0);
  const [lpPrice, setLpPrice] = useState(0);
  const [lpSupply, setLpSupply] = useState(0);

  //-- Prices from BoardRoom
  const { refetch: levelPriceReadRefetch } = useContractRead({
    address: ethLevelLpBoardRoomAddress,
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: arbChainId,
    onSuccess(levelPriceData) {
      const read19 = (levelPriceData || 0).toString();
      const newNativePrice = ethers.utils.formatEther(read19);
      if (nativePrice !== newNativePrice) {
        setNativePrice(newNativePrice);
      }
    },
  });

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
      const newSushiPrice = ethers.utils.formatUnits(read19, 8);
      if (sushiPrice !== newSushiPrice) {
        setSushiPrice(newSushiPrice);
      }
    }, 
  });

  // LP info
  const { refetch: lpreservesReadRefetch } = useContractRead({
    address: ethLevelLpTokenAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: arbChainId,
    onSuccess(data) {
      const read23 = data[1] || 0;
      const mul = read23 * 2;
      const newLpPrice = ethers.utils.formatEther(mul.toString())
      if (lpPrice !== newLpPrice) {
        setLpPrice(newLpPrice);
      }
    },
  });
  const { refetch: lpSupplyReadRefetch } = useContractRead({
    address: ethLevelLpTokenAddress,
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: arbChainId,

    onSuccess(data) {
      const read24 = data;
      const newLpSupply = ethers.utils.formatEther(read24.toString());
      if (lpSupply !== newLpSupply) {
        setLpSupply(newLpSupply);
      }
    },
  });

  const { refetch: totalAllocReadRefetch } = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "totalAllocPoint",
    chainId: arbChainId,

    onSuccess(data) {
      const totallcread0 = (data || 0).toString();
      if (totallcread0 !== totalAllocation) {
        setTotalAllocation(totallcread0);
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
    levelPriceReadRefetch();
    ethPriceReadRefetch();
    arbPriceReadRefetch();
    sushiPriceReadRefetch();
    lpreservesReadRefetch();
    lpSupplyReadRefetch();
    // Total Alloc
    totalAllocReadRefetch();
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
        <GenesisOverview 
          nativePrice={nativePrice}
          ethPrice={ethPrice}
        />
        <GenesisPool // WETH
          refresh={refreshCount}
          tokenName={"WETH"}
          tokenAddress={wethTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={WETH_INDEX}
          tokenDecimal={18}
          totalAllocation={totalAllocation}
          tokenPrice={ethPrice}
        />
        <GenesisPool // Sushi
          refresh={refreshCount}
          tokenName={"SUSHI"}
          tokenAddress={sushiTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908734670147644/sSUSHI.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={SUSHI_INDEX}
          tokenDecimal={18}
          totalAllocation={totalAllocation}
          tokenPrice={sushiPrice}
        />
        <GenesisPool // Arbitrum
          refresh={refreshCount}
          tokenName={"ARB"}
          tokenAddress={arbTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105909574810222773/sARB.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={ARB_INDEX}
          tokenDecimal={18}
          totalAllocation={totalAllocation}
          tokenPrice={arbPrice}
        />
        <GenesisPool // USDC
          refresh={refreshCount}
          tokenName={"USDC"}
          tokenAddress={usdcTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908735139917977/sUSDC.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={USDC_INDEX}
          tokenDecimal={6}
          totalAllocation={totalAllocation}
          tokenPrice={1}
        />
        <GenesisPool // USDT
          refresh={refreshCount}
          tokenName={"USDT"}
          tokenAddress={usdtTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908735794225262/sUSDT.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={USDT_INDEX}
          tokenDecimal={6}
          totalAllocation={totalAllocation}
          tokenPrice={1}
        />
        <GenesisPool // DAI
          refresh={refreshCount}
          tokenName={"DAI"}
          tokenAddress={daiTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908731708977272/sDAI.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={DAI_INDEX}
          tokenDecimal={18}
          totalAllocation={totalAllocation}
          tokenPrice={1}
        />

        <GenesisPool // ETH/LEVEL
          refresh={refreshCount}
          tokenName={"ETH/LEVEL"}
          tokenAddress={ethLevelLpTokenAddress}
          gifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"}
          lpGifIcon={"https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"}
          nativePrice={nativePrice}
          ethPrice={ethPrice}
          tokenIndex={ETHLEVEL_INDEX}
          tokenDecimal={18}
          totalAllocation={totalAllocation}
          tokenPrice={(lpPrice / lpSupply) || 1}
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
