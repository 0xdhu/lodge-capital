import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
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

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import ExampleCA from "@/components/contestAlert.jsx";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import GenesisABI from "@/constants/GenesisABI.json";
import BUSDABI from "@/constants/BUSDABI.json";
import DepositModal from "@/components/GenesisPoolModalDeposit.jsx";
import WithdrawModal from "@/components/GenesisPoolModalWithdraw.jsx";
import { useEffect, useState } from "react";
import { Usdc } from "web3uikit";
import { ethers } from "ethers";
import BoardRoomABI from "@/constants/BoardRoomABI.json";
import ChainlinkFEEDABI from "@/constants/ChainlinkFEEDABI.json";
import SLPABI from "@/constants/SLPABI.json";

export default function Masonry() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [usdcTVL, setUsdcTVL] = useState(0);
  const [ethTVL, setEthTVL] = useState(0);
  const [daiTVL, setDaiTVL] = useState(0);
  const [sushiTVL, setSushiTVL] = useState(0);
  const [arbTVL, setArbTVL] = useState(0);
  const [ethLevelTVL, setEthLevelTVL] = useState(0);

  const [userSushi, setUserSushi] = useState(0);
  const [userEth, setUserEth] = useState(0);
  const [userArb, setUserArb] = useState(0);
  const [userETHLEVEL, setUserETHLEVEL] = useState(0);
  const [userDAI, setUserDAI] = useState(0);
  const [userUSDC, setUserUSDC] = useState(0);

  const [pendinfSushi, setPendingSushi] = useState(0);
  const [pendingEth, setPendingEth] = useState(0);
  const [pendingArb, setPendingArb] = useState(0);
  const [pendingETHLEVEL, setPendingETHLEVEL] = useState(0);
  const [pendingDAI, setPendingDAI] = useState(0);
  const [pendingUSDC, setPendingUSDC] = useState(0);

  const [nativePrice, setNativePrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [arbPrice, setArbPrice] = useState(0);
  const [sushiPrice, setSushiPrice] = useState(0);
  const [lpPrice, setLpPrice] = useState(0);
  const [lpSupply, setLpSupply] = useState(0);
  const genesisRewardPoolAddress = "0x68d0E9B1F9E839AcC1C6179BA0c5577CF0e4eB2b";

  const SushiPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const SushiTVLRead = useContractRead({
    address: "0x32468E1C4014c9C802752Dfe3Ad6CEc1c3C4A2ac",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const SushiUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ETHPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHTVLRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("SuccessFUll checccck", data[0].toString());
    },
  });

  const ARBPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ARBTVLRead = useContractRead({
    address: "0x32468E1C4014c9C802752Dfe3Ad6CEc1c3C4A2ac",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ARBUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ETHLVLPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHLVLTVLRead = useContractRead({
    address: "0x32468E1C4014c9C802752Dfe3Ad6CEc1c3C4A2ac",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHLVLUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const USDCPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDCTVLRead = useContractRead({
    address: "0x32468E1C4014c9C802752Dfe3Ad6CEc1c3C4A2ac",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDCUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const DAIPendingRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DAITVLRead = useContractRead({
    address: "0x32468E1C4014c9C802752Dfe3Ad6CEc1c3C4A2ac",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 421613,
    args: [genesisRewardPoolAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DAIUserRead = useContractRead({
    address: genesisRewardPoolAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 421613,
    args: [1, address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelPriceRead = useContractRead({
    address: "0x2cE4EdE48ec35FD8940c8e61f15B4070259003E1",
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: 421613,

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
  const arbPriceRead = useContractRead({
    address: "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const sushiPriceRead = useContractRead({
    address: "0xb2a8ba74cbca38508ba1632761b56c897060147c",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpreservesRead = useContractRead({
    address: "0x17b54C55a9Aa3DC1f548C64a85062140567ed9Af",
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 421613,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpSupplyRead = useContractRead({
    address: "0x17b54C55a9Aa3DC1f548C64a85062140567ed9Af",
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: 421613,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const unwatch = watchBlockNumber(
    {
      chainId: 421613,
    },
    (blockNumber) => console.log(blockNumber)
  );

  async function updateUI() {
    const read1 = (SushiPendingRead.data || 0).toString();
    setPendingSushi(read1);

    const read2 = (SushiTVLRead.data || 0).toString();
    setSushiTVL(read2);
    const read3 = (SushiUserRead.data[0] || 0).toString();
    setUserSushi(read3);
    const read4 = (USDCPendingRead.data || 0).toString();
    setPendingUSDC(read4);
    const read5 = (USDCTVLRead.data || 0).toString();
    setUsdcTVL(read5);
    const read6 = (USDCUserRead.data[0] || 0).toString();
    setUserUSDC(read6);
    const read7 = (DAIPendingRead.data || 0).toString();
    setPendingDAI(read7);
    const read8 = (DAITVLRead.data || 0).toString();
    setDaiTVL(read8);

    const read9 = (DAIUserRead.data[0] || 0).toString();
    setUserDAI(read9);
    const read10 = (ARBPendingRead.data || 0).toString();
    setPendingArb(read10);
    const read11 = (ARBTVLRead.data || 0).toString();
    setArbTVL(read11);
    const read12 = (ARBUserRead.data[0] || 0).toString();
    setUserArb(read12);

    const read13 = (ETHPendingRead.data || 0).toString();
    setPendingEth(read13);
    const read14 = (ETHTVLRead.data || 0).toString();
    setEthTVL(read14);
    const read15 = (ETHUserRead.data[0] || 0).toString();

    setUserEth(read15);
    const read16 = (ETHLVLPendingRead.data || 0).toString();
    setPendingETHLEVEL(read16);
    const read17 = (ETHLVLTVLRead.data || 0).toString();
    setEthLevelTVL(read17);
    const read18 = (ETHLVLUserRead.data[0] || 0).toString();
    setUserETHLEVEL(read18);
    const read19 = (levelPriceRead.data || 0).toString();
    setNativePrice(ethers.utils.formatEther(read19));
    const read20 = (ethPriceRead.data || 0).toString();
    setEthPrice(ethers.utils.formatUnits(read20, 8));
    const read21 = (sushiPriceRead.data || 0).toString();
    setSushiPrice(ethers.utils.formatUnits(read21, 8));
    const read22 = (arbPriceRead.data || 0).toString();
    setArbPrice(ethers.utils.formatUnits(read22, 8));
    const read23 = lpreservesRead.data[1] || 0;
    const read24 = lpSupplyRead.data;
    setLpSupply(ethers.utils.formatEther(read24.toString()));
    const mul = read23 * 2;
    setLpPrice(ethers.utils.formatEther(mul.toString()));
  }
  useEffect(() => {
    updateUI();
  }, [unwatch]);

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
        <div className=" flex w-full mx-auto justify-between max-w-7xl mt-4 items-center gap-2 rounded-lg   py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75l">
          <div className=" w-full  flex-col flex h-auto justify-between   mt-4  rounded-lg bg-white  px-4 py-2  text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 text-center">
            {" "}
            <div className=" flex-auto text-right font-bold">
              Farms & Staking {}{" "}
            </div>
            <div className=" flex-auto text-left">LEVEL TO HARVEST: </div>
            <div className=" flex-auto text-left text-xl">
              {ethers.utils.formatEther(
                pendinfSushi +
                  pendingArb +
                  pendingDAI +
                  pendingETHLEVEL +
                  pendingEth +
                  pendingUSDC
              )}
            </div>
            <div className=" flex-auto  text-left">
              ${" "}
              {ethers.utils.formatEther(
                pendinfSushi +
                  pendingArb +
                  pendingDAI +
                  pendingETHLEVEL +
                  pendingEth +
                  pendingUSDC
              ) * nativePrice}
            </div>
            <div className=" flex-auto font-bold text-xl text-right">
              {" "}
              {ethers.utils.formatEther(
                sushiTVL * sushiPrice +
                  arbTVL * arbPrice +
                  daiTVL +
                  ethLevelTVL * (lpPrice / lpSupply || 1) +
                  ethTVL * ethPrice +
                  usdcTVL
              )}{" "}
              staked
            </div>
          </div>
        </div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>
                <div className="flex-auto  w-2">ETH</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(ethTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {ethers.utils.formatEther(userEth)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 mb-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: ${" "}
                  {ethers.utils.formatEther(pendingEth) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Claim
                </button>
                <DepositModal index={0} />
                <WithdrawModal />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  w-2">SUSHI</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(sushiTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {ethers.utils.formatEther(userSushi)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: ${" "}
                  {ethers.utils.formatEther(pendinfSushi) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Claim
                </button>
                <DepositModal index={1} />
                <WithdrawModal />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  w-2">ARB</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(arbTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>{ethers.utils.formatEther(userArb)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: $
                  {ethers.utils.formatEther(pendingArb) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black ">
                  Claim
                </button>
                <button className="bg-black mx-2 rounded-lg py-2  text-white flex-auto ">
                  Deposit
                </button>
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Withdraw
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>{" "}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  w-2">USDC</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(usdcTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {ethers.utils.formatEther(userUSDC)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: ${" "}
                  {ethers.utils.formatEther(pendingUSDC) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black ">
                  Claim
                </button>
                <button className="bg-black mx-2 rounded-lg py-2  text-white flex-auto ">
                  Deposit
                </button>
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Withdraw
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>{" "}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  w-2 ">DAI </div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(daiTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {ethers.utils.formatEther(userDAI)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: ${" "}
                  {ethers.utils.formatEther(pendingDAI) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black ">
                  Claim
                </button>
                <button className="bg-black mx-2 rounded-lg py-2  text-white flex-auto ">
                  Deposit
                </button>
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Withdraw
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>{" "}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "rounded-b-none " : ""
                } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-cdnter text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <div className="flex-auto flex-col">
                  <img
                    className="w-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    }
                  ></img>
                </div>

                <div className=" flex-auto   w-2  ">ETH/LEVEL</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>999%</div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div> ${ethers.utils.formatEther(ethLevelTVL)}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {ethers.utils.formatEther(userETHLEVEL)}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: ${" "}
                  {ethers.utils.formatEther(pendingETHLEVEL) * nativePrice}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black ">
                  Claim
                </button>
                <button className="bg-black mx-2 rounded-lg py-2  text-white flex-auto ">
                  Deposit
                </button>
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Withdraw
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <span> {"   "}</span>
        <span> {"   "}</span>
        <span> {"   "}</span>
        <span> {"   "}</span>
        <div> {"  "}</div>
        <span> {"   "}</span>
        <ExampleFF />
      </main>
    </>
  );
}
