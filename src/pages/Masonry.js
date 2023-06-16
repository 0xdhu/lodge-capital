import Head from "next/head";
import Image from "next/image";
import { Butterfly_Kids, Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/myHeader.jsx";
import Header1 from "../components/Header.jsx";
const inter = Inter({ subsets: ["latin"] });
const logo = require("../images/cake-busd.png");
const logo1 = require("../images/busd-icon.png");
const logo2 = require("../images/level-icon.png");
import ExampleHeader from "@/components/thheader.jsx";
import ExampleModal from "@/components/mymodal.jsx";
import ExampleB from "@/components/abutton.jsx";
import ExampleA from "@/components/bbutton.jsx";
import ExampleFF from "@/components/footer.jsx";
import Example from "@/components/MyChart.jsx";
import ExampleC from "@/components/Chart2.jsx";
import { useContractRead, WagmiConfig, useAccount } from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import ExampleCA from "@/components/contestAlert.jsx";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import ExamplePie from "@/components/aPie.jsx";
import { useEffect, useState } from "react";
import BoardRoomABI from "@/constants/BoardRoomABI.json";
import TreasuryABI from "@/constants/TreasuryABI.json";
import { ethers, BigNumber } from "ethers";
import MasonryDepositModal from "@/components/MasonryDepositModal.jsx";
import Countdown from "@/components/MyCountdown.jsx";
import MasonryWithdrawModal from "@/components/MasonryWithdrawModal.jsx";
import ChainlinkFEEDABI from "@/constants/ChainlinkFEEDABI.json";
import SLPABI from "@/constants/SLPABI.json";

export default function Masonry() {
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
  const treasuryAddress = "0xE058027ED5a2a15eAfBdb798d46B29bB3257B34D";
  const boardRoomAddress = "0x4d6316e252BB639EC17488251375E6E1f905fE4D";

  const supplyTiers = [
    0, 37860, 80932, 121399, 243046, 796640, 1499249, 3333332, 6000000,
  ];
  const maxExpansionTiers = [600, 500, 400, 300, 200, 150, 100, 50, 25];

  const { address } = useAccount();
  const ContractRead = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "nextEpochPoint",
    chainId: 42161,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead1 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead5 = useContractRead({
    address: treasuryAddress,
    abi: TreasuryABI,
    functionName: "epoch",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ContractRead2 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ContractRead3 = useContractRead({
    address: treasuryAddress,
    abi: TreasuryABI,
    functionName: "getNativeCirculatingSupply",

    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ContractRead4 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "members",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ContractRead6 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "canWithdraw",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead7 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "canClaimReward",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead8 = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "members",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelPriceRead = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ethPriceRead = useContractRead({
    address: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lpreservesReadlodge = useContractRead({
    address: "0xa3c513d75FCa556d3E6E1293eBa1a5C37F3742bB",
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const totalSupplyRead = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "totalSupply",

    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const earnedRead = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "earned",
    args: [address || "0x000000000000000000000000000000000000dead"],

    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const unwatch = watchBlockNumber(
    {
      chainId: 42161,
    },
    (blockNumber) => console.log(blockNumber)
  );

  async function updateUI() {
    try {
      const rdep = ContractRead.data.toString();
      const rdep1 = parseFloat(ContractRead1.data / 1700000000000000 || 0)
        .toFixed(2)
        .toString();
      const rdep2 = ContractRead2.data.toString();
      const rdep3 = ContractRead3.data.toString();
      const rdep4 = ContractRead5.data.toString();
      const rdep5 = ContractRead4.data[2].toString();
      const rdep6 = ContractRead6.data;
      const nativepricething = (levelPriceRead.data || 0).toString();
      const ethpricething = (ethPriceRead.data || 0).toString();
      setEthPrice(ethers.utils.formatUnits(ethpricething, 8));
      setNativePrice(ethers.utils.formatEther(nativepricething));
      setCanWithdraw(rdep6);
      setUserEpoch(rdep5);
      const rdep7 = ContractRead7.data;
      setCanClaim(rdep7);
      setEpoch(rdep4);
      setGetNativeCirculatingSupply(rdep3);
      setDeposited(rdep2);
      setNextEpochPoint(rdep);
      setTwap(rdep1);

      const read25 = lpreservesReadlodge.data[1] || 0;

      const read27 = lpreservesReadlodge.data[0] || 1;
      setLodgePrice(read25 / read27);
      const read26 = (totalSupplyRead.data || 0).toString();
      setTotalSupply(ethers.utils.formatEther(read26));

      const read29 = (earnedRead.data || 0).toString();
      setPendingLEVEL(ethers.utils.formatEther(read29));
    } catch {}
  }
  useEffect(() => {
    updateUI();
  }, [unwatch]);

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
                <button className="text-xl text-center justify-self-center flex-auto m-2    rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out">
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
