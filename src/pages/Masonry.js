import Head from "next/head";
// import Image from "next/image";
// import { Butterfly_Kids, Inter } from "@next/font/google";
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
// import Example from "@/components/MyChart.jsx";
// import ExampleC from "@/components/Chart2.jsx";
import { useContractRead, WagmiConfig, useAccount } from "wagmi";
// import { watchBlockNumber } from "@wagmi/core";
import ExampleCA from "@/components/contestAlert.jsx";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { PureComponent } from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import ExamplePie from "@/components/aPie.jsx";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MasonryDepositModal from "@/components/MasonryDepositModal.jsx";
import Countdown from "@/components/MyCountdown.jsx";
import MasonryWithdrawModal from "@/components/MasonryWithdrawModal.jsx";
import { ContractAddressList, DeadAddress, SLPABI, ChainlinkFEEDABI, TreasuryABI, BoardRoomABI } from "@/constants/index.js";
import useRefreshHook from "@/hook/refresh.jsx";

const {
  chainId: arbChainId,
  treasuryAddress,
  boardRoomAddress,
  ethLevelLpTokenAddress,
  wethEACAggregatorProxyAddress,
} = ContractAddressList;

export default function Masonry() {
  const { refreshCount } = useRefreshHook(60000);
  const [nextEpochPoint, setNextEpochPoint] = useState(0);
  const [twap, setTwap] = useState(0);
  const [deposited, setDeposited] = useState(0);
  const [getNativeCirculatingSupply, setGetNativeCirculatingSupply] =
    useState(0);
  const [epoch, setEpoch] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [userEpoch, setUserEpoch] = useState(0);
  const [nativePrice, setNativePrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [lodgePrice, setLodgePrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [pendingLEVEL, setPendingLEVEL] = useState(0);

  const supplyTiers = [
    0, 37860, 80932, 121399, 243046, 796640, 1499249, 3333332, 6000000,
  ];
  const maxExpansionTiers = [600, 500, 400, 300, 200, 150, 100, 50, 25];

  const { address } = useAccount();
  const { refetch: nextEpochPointRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "nextEpochPoint",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const rdep = data.toString();
      setNextEpochPoint(rdep);
    },
  });

  const { refetch: getNativePriceRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const rdep1 = parseFloat(data / 1700000000000000 || 0)
        .toFixed(2)
        .toString();
      setTwap(rdep1);
    },
  });

  const { refetch: epochRefetch } = useContractRead({
    address: treasuryAddress,
    abi: TreasuryABI,
    functionName: "epoch",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {      
      const rdep4 = data.toString();
      setEpoch(rdep4);
    },
  });

  const { refetch: balanceOfRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "balanceOf",
    args: [address || DeadAddress],
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const rdep2 = data.toString();
      setDeposited(rdep2);
    },
  });

  const {refetch: getNativeCirculatingSupplyRefetch} = useContractRead({
    address: treasuryAddress,
    abi: TreasuryABI,
    functionName: "getNativeCirculatingSupply",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const rdep3 = data.toString();
      setGetNativeCirculatingSupply(rdep3);
    },
  });

  const { refetch: membersRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "members",
    args: [address || DeadAddress],
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {      
      const rdep5 = data[2].toString();
      setUserEpoch(rdep5);
    },
  });

  const { refetch: canWithdrawRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "canWithdraw",
    args: [address || DeadAddress],
    chainId: arbChainId,

    // watch: true,
    onSuccess(data) {
      setCanWithdraw(data);
    },
  });

  const {refetch: canClaimRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "canClaimReward",
    args: [address || DeadAddress],
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      setCanClaim(data);
    },
  });

  const { refetch: levelPriceReadRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const nativepricething = (data || 0).toString();
      setNativePrice(ethers.utils.formatEther(nativepricething));
    },
  });

  const { refetch: ethPriceReadRefetch } = useContractRead({
    address: wethEACAggregatorProxyAddress,
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const ethpricething = (data || 0).toString();
      setEthPrice(ethers.utils.formatUnits(ethpricething, 8));
    },
  });

  const lpreservesReadlodge = useContractRead({
    address: ethLevelLpTokenAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: arbChainId
  });

  const totalSupplyRead = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "totalSupply",
    chainId: arbChainId
  });

  const {refetch: earnedReadRefetch } = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "earned",
    args: [address || DeadAddress],
    chainId: arbChainId,
    // watch: true,
    onSuccess(data) {
      const read29 = (data || 0).toString();
      setPendingLEVEL(ethers.utils.formatEther(read29));
    },
  });

  async function updateUI() {
    try {
      nextEpochPointRefetch();
      getNativePriceRefetch();
      epochRefetch();
      balanceOfRefetch();
      getNativeCirculatingSupplyRefetch();
      membersRefetch();
      canWithdrawRefetch();
      levelPriceReadRefetch();
      ethPriceReadRefetch();
      canClaimRefetch();
      
      const read25 = lpreservesReadlodge.data[1] || 0; // WETH
      const read27 = lpreservesReadlodge.data[0] || 1; // LODGE
      setLodgePrice(read25 / read27); // LODGE price in terms of ETH

      const read26 = (totalSupplyRead.data || 0).toString();
      setTotalSupply(ethers.utils.formatEther(read26));

      earnedReadRefetch();
    } catch {}
  }
  
  useEffect(() => {
    updateUI();
  }, [refreshCount]);

  function getPrint() {
    const myvar = ethers.utils.formatEther(
      getNativeCirculatingSupply.toString()
    );
    for (let tierId = 8; tierId >= 0; --tierId) {
      if (myvar >= supplyTiers[tierId]) {
        return (
          (maxExpansionTiers[tierId] / 10000) *
          ethers.utils.formatEther(getNativeCirculatingSupply)
        ).toFixed(2);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1075814264163541122/lodge-bg.png')] bg-black w-screen h-100%  bg-no-repeat bg-cover bg-center   min-h-screen ">
        <ExampleHeader className="z-20" /> <ExampleCA className="z-50" />
        <div className="flex   min-h-full flex-col mt-8 ">
          {/* 2 column wrapper */}
          <div className="mx-auto w-full max-w-6xl grow lg:flex xl:px-2  ">
            {/* Left sidebar & main wrapper */}

            <div className=" m-2 flex flex-col max-w-4xl px-4 py-6 sm:px-6 bg-white bg-opacity-70 	 rounded-xl lg:pl-8 xl:flex-1 xl:pl-6">
              <div className=" text-xl "> Supply stats</div>
              <div>
                {" "}
                <div>
                  • Epoch lengths are randomized, scaling from 3 to 9 hours.
                </div>
                <div>• LODGE can be withdrawn after 6 Epochs.</div>
                <div>• LEVEL rewards can be withdrawn after 3 Epochs.</div>
                <div className="font-semibold">
                  Taking the following actions will reset both lockup timers:
                </div>
                <div>• Depositing or withdrawing LODGE to/from The Masonry</div>
                <div>• Claiming LEVEL rewards</div>
              </div>
              <div className="flex flex-row mt-auto mb-4 ">
                <div className="flex flex-col gap-4">
                  <div className="  text-lg font-semibold">EPOCH MINT</div>

                  <div className="text-center">{getPrint()} LEVEL</div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center"></div>
                  </div>
                  <div className=" text-xl font-bold">Next Reward</div>
                  <Countdown timestamp={nextEpochPoint} />
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center"></div>
                  </div>
                  <div className="text-xl font-semibold">Total staked</div>
                  <div className="text-center">${totalSupply}</div>
                </div>

                <ExamplePie fill={"#fff"} />
              </div>
              <div className="flex flex-wrap gap-4 mt-auto">
                <div>
                  <div className="text-xl font-bold"> Claim</div>
                  <div className="text-center">
                    {" "}
                    {canClaim
                      ? "Claimable"
                      : userEpoch - epoch + 2 + "epoch"}{" "}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold"> Withdraw</div>
                  <div className="text-center">
                    {canWithdraw
                      ? "Claimable"
                      : userEpoch - epoch + 4 + " epoch"}{" "}
                  </div>
                </div>
                <button className="text-xl text-center justify-self-center flex-auto m-2 rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out">
                  claim
                </button>{" "}
                <MasonryWithdrawModal />
              </div>
            </div>

            <div className=" m-2 min-w-max rounded-xl justify-center items-center bg-opacity-70 max-w-4xl text-center bg-white px-4 py-6 sm:px-6 lg:pl-8 xl:w-96 xl:shrink-0  xl:pl-6">
              {/* Left column area */}
              <div className=" inline-flex  text-center justify-center items-center justify-self-center">
                <img
                  className="text-center h-24 bg-white rounded-full"
                  src={
                    "https://media.tenor.com/9SQD7cT_c2sAAAAd/lodgecapital.gif"
                  }
                />
              </div>

              <div className="mt-6 text-2xl font-bold">TWAP</div>
              <div> {twap}</div>
              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center"></div>
              </div>
              <div className="mt-6 text-2xl font-bold">APR</div>
              <div>{getPrint() * nativePrice * ethPrice} % </div>
              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center"></div>
              </div>

              <div className="text-xl font-semibold mt-6"> Staked {}</div>
              <div className=" mt-2">
                {" "}
                {ethers.utils.formatEther(deposited)} LODGE
              </div>
              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center"></div>
              </div>

              <div className="text-xl font-semibold mt-6"> Reward {}</div>
              <div className=" mt-2"> {pendingLEVEL} LEVEL</div>
              <MasonryDepositModal />
            </div>
          </div>
        </div>
        <ExampleFF className="sticky top-[100vh] z-50" />
      </main>
    </>
  );
}
