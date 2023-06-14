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
import {
  useContractRead,
  WagmiConfig,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
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
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { toast, Toaster } from "react-hot-toast";
import zapABI from "@/constants/zapABI.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const frequencies = [
  { value: "monthly", label: "add Liquidity", priceSuffix: "/month" },
  { value: "annually", label: "remove Liquidity", priceSuffix: "/year" },
];
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
  const [lodgeBalance, setLodgeBalance] = useState(0);
  const [levelBalance, setLevelBalance] = useState(0);
  const [lodgeLpBalance, setLodgeLpBalance] = useState(0);
  const [levelLpBalance, setLevelLpBalance] = useState(0);
  const [lodgelpratio, setLodgelpratio] = useState(0);
  const [levellpratio, setLevellpratio] = useState(0);
  let [ValueOrder, setValueOrder] = useState(0);
  let [ValueOrder1, setValueOrder1] = useState(0);
  const [wethBalance, setWethBalance] = useState(0);
  const [lodgeAllowance, setLodgeAllowance] = useState(0);
  const [levelAllowance, setLevelAllowance] = useState(0);
  const [wethAllowance, setWethAllowance] = useState(0);

  const treasuryAddress = "0x0530F0513Ec5898Ca3735710f0532Ab3202D00b7";
  const boardRoomAddress = "0x2cE4EdE48ec35FD8940c8e61f15B4070259003E1";

  const [frequency, setFrequency] = useState(frequencies[0]);

  const people = [{ name: "LODGE" }, { name: "LEVEL" }];
  const people1 = [{ name: "LODGE/WETH" }, { name: "LEVEL/WETH" }];
  const [selected, setSelected] = useState(people[0]);
  const [selected1, setSelected1] = useState(people1[0]);

  const lodgelpAddress = "0x37C95C32E6F45063acC5117Bb28095e4f5687A18";
  const levellpAddress = "0xf6f86E01312B89BC189707dA449e9E0B094a2231";
  const lodgeAddress = "0x44eFfaFbD4a793848423C35A78C5c5a420acb03d";
  const levelAddress = "0x4839E7897417079FFB0420bF9c8366Aa0B82e2d3";
  const wethAddress = "0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f";
  const zapAddress = "0xF012A1f9fAdD850fd82dec1E2aEfbe453FCf4253";

  const { address } = useAccount();

  const notify2 = () => toast(<div> Transaction sent! </div>);
  const notify5 = () => toast(<div> Transaction sent! </div>);
  const notify3 = () =>
    toast.error(
      <div>
        {" "}
        <div>Something went horrible !</div>
        <a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">
          arbiscan
        </a>
      </div>
    );
  const notify6 = () =>
    toast.error(
      <div>
        {" "}
        <div>Something went horrible !</div>
        <a
          href={`https://arbiscan.com/tx/${approveData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const notify1 = () =>
    toast.success(
      <div>
        {`Succesfully purchased ${
          Math.round((ValueOrder * 100) / 333) / 100
        } DUES!  `}{" "}
        <a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">
          arbiscan
        </a>
      </div>
    );
  const notify4 = () =>
    toast.success(
      <div>
        {`Succesfully approved ${selected.name} !  `}{" "}
        <a
          href={`https://arbiscan.com/tx/${approveData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const wethBalanceRead = useContractRead({
    address: wethAddress,
    abi: SLPABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 421613,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lodgeBalanceRead = useContractRead({
    address: lodgeAddress,
    abi: SLPABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 421613,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelBalanceRead = useContractRead({
    address: levelAddress,
    abi: SLPABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 421613,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lodgelpBalanceRead = useContractRead({
    address: lodgelpAddress,
    abi: SLPABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
    chainId: 421613,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelpBalanceRead = useContractRead({
    address: levellpAddress,
    abi: SLPABI,
    functionName: "balanceOf",
    args: [address || "0x000000000000000000000000000000000000dead"],
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

  const lpreservesReadlodge = useContractRead({
    address: lodgelpAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 421613,

    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lpreservesReadlevel = useContractRead({
    address: levellpAddress,
    abi: SLPABI,
    functionName: "getReserves",
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

  const { config: approveConfig, error: approveError } =
    usePrepareContractWrite({
      address: levelAddress,
      abi: SLPABI,
      functionName: "approve",
      chainId: 421613,
      args: [zapAddress, "1000000000000000000000000"],
    });
  const {
    write: approveWrite,
    isSuccess: approveSuccess,
    data: approveData,
    isLoading: approveLoading,
  } = useContractWrite({ ...approveConfig, onSuccess: notify5 });

  const { isSuccess: finished1 } = useWaitForTransaction({
    chainId: 421613,
    hash: approveData?.hash,
    onSuccess: notify4,
    onError: notify6,
  });

  const ContractRead1 = useContractRead({
    address: levelAddress,
    abi: SLPABI,
    functionName: "allowance",
    args: [address, zapAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const { config: approveConfigLodge, error: approveErrorlodge } =
    usePrepareContractWrite({
      address: lodgeAddress,
      abi: SLPABI,
      functionName: "approve",
      chainId: 421613,
      args: [zapAddress, "1000000000000000000000000"],
    });
  const {
    write: approveWriteLodge,
    isSuccess: approveSuccessLodge,
    data: approveDataLodge,
    isLoading: approveLoadingLodge,
  } = useContractWrite({ ...approveConfigLodge, onSuccess: notify5 });

  const { isSuccess: finished2 } = useWaitForTransaction({
    chainId: 421613,
    hash: approveDataLodge?.hash,
    onSuccess: notify4,
    onError: notify6,
  });

  const ContractRead2 = useContractRead({
    address: lodgeAddress,
    abi: SLPABI,
    functionName: "allowance",
    args: [address, zapAddress],
    chainId: 421613,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead3 = useContractRead({
    address: wethAddress,
    abi: SLPABI,
    functionName: "allowance",
    args: [address, zapAddress],
    chainId: 421613,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const { config: approveConfigWETH, error: approveErrorWETH } =
    usePrepareContractWrite({
      address: wethAddress,
      abi: SLPABI,
      functionName: "approve",
      chainId: 421613,
      args: [zapAddress, "1000000000000000000000000"],
    });
  const {
    write: approveWriteWETH,
    isSuccess: approveSuccessweth,
    data: approveDataweth,
    isLoading: approveLoadingweth,
  } = useContractWrite({ ...approveConfigWETH, onSuccess: notify5 });

  const { config: supplyConfig, error: supplyError } = usePrepareContractWrite({
    address: zapAddress,
    abi: zapABI,
    functionName: "addTaxFreeLiquidity",

    chainId: 421613,
    args: [
      selected.name == "LODGE" ? lodgeAddress : levelAddress,
      wethAddress,
      ethers.utils.parseEther((parseFloat(ValueOrder) || "1").toString()),
      ethers.utils.parseEther((ValueOrder1 || "1").toString()),
    ],
  });
  const {
    write: supplyWrite,
    isSuccess: supplySuccess,
    isLoading: supplyLoading,
  } = useContractWrite({ ...supplyConfig, onSuccess: notify5 });

  async function updateUI() {
    try {
      const rdep = (lodgelpBalanceRead.data || 0).toString();
      setLodgeLpBalance(ethers.utils.formatEther(rdep));

      const read1 = (levelpBalanceRead.data || 0).toString();
      setLevelLpBalance(ethers.utils.formatEther(read1));

      const read2 = (lodgeBalanceRead.data || 0).toString();

      setLodgeBalance(ethers.utils.formatEther(read2));

      const read3 = (levelBalanceRead.data || 0).toString();

      setLevelBalance(ethers.utils.formatEther(read3));
      const read4 = (lpreservesReadlodge.data[0] || 0).toString();
      const read5 = (lpreservesReadlodge.data[1] || 0).toString();
      setLodgelpratio(read4 / read5);
      const read6 = (lpreservesReadlevel.data[0] || 0).toString();
      const read7 = (lpreservesReadlevel.data[1] || 0).toString();
      setLevellpratio(read6 / read7);
    } catch {}
    try {
      const read8 = (wethBalanceRead.data || 0).toString();
      setWethBalance(ethers.utils.formatEther(read8));
    } catch {}
    try {
      const read9 = (ContractRead1.data || 0).toString();
      setLevelAllowance(ethers.utils.formatEther(read9));
    } catch {}
    try {
      const read10 = (ContractRead2.data || 0).toString();
      setLodgeAllowance(ethers.utils.formatEther(read10));
    } catch {}
    try {
      const read11 = (ContractRead3.data || 0).toString();
      setWethAllowance(ethers.utils.formatEther(read11));
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
      <main class="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1075814264163541122/lodge-bg.png')] bg-black w-screen h-100%  bg-no-repeat bg-cover bg-center   min-h-screen ">
        <ExampleHeader className="z-20" /> <ExampleCA className="z-50" />
        <div className="flex   min-h-full flex-col mt-8 ">
          {console.log(supplyConfig.data + "sddsadas")}
          <div className="mt-16 flex justify-center">
            {}
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
            >
              <RadioGroup.Label className="sr-only">
                Payment frequency
              </RadioGroup.Label>
              {frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? "bg-white text-black" : "",
                      "cursor-pointer rounded-full px-2.5 py-1"
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          ()
          {/* 2 column wrapper */}
          <div className=" w-full  grow lg:flex xl:px-2 items-center justify-center   ">
            {/* Left sidebar & main wrapper */}

            {frequency.label === "add Liquidity" ? (
              <div className=" m-2 flex flex-col max-w-4xl px-4 py-6 sm:px-6 bg-white bg-opacity-70  items-center rounded-xl lg:pl-8 xl:flex-1 xl:pl-6">
                <div className=" text-xl ">Add liquidity tax free</div>
                <div className="flex mt-4 flex-nowrap w-full gap-8">
                  {" "}
                  <div className=" text-center items-center justify-between flex-auto">
                    <div className="">
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate text-center text-black">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {people.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-black text-white scale:110"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="text-center items-center justify-between flex-auto mt-1">
                    <div className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-center text-black">
                        &nbsp;&nbsp;&nbsp;ETH&nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 flex-nowrap w-full gap-8">
                  <div className=" text-center items-center justify-between flex-auto">
                    Available{" "}
                    {selected.name == "LODGE" ? lodgeBalance : levelBalance}{" "}
                    {selected.name}
                  </div>{" "}
                  <div className=" text-center items-center justify-between flex-auto">
                    Available {wethBalance} WETH
                  </div>
                </div>
                <div className="flex flex-row mt-4 flex-wrap w-full gap-6 sm:gap-8">
                  <div className="w-1/4 flex-auto text-center">
                    <input
                      className=" flex-auto rounded-lg  border-2"
                      type="number" // change the type to "number"
                      style={{
                        maxWidth: "35%",
                        borderColor: "#000",
                        cursor: "zoom-in",
                      }}
                      value={ValueOrder}
                      step="0.0001" // bind the value of the input field to the same value as the slider
                      max={
                        wethBalance *
                        (selected.name == "LODGE" ? lodgelpratio : levellpratio)
                      }
                      onChange={(event) => {
                        setValueOrder(event.target.value);
                        setValueOrder1(
                          (
                            event.target.value *
                            (selected.name == "LODGE"
                              ? 1 / lodgelpratio
                              : 1 / levellpratio)
                          ).toFixed(6)
                        ); // update the value of the slider when the input field value changes
                      }}
                    />
                  </div>
                  <div className="w-1/4 flex-auto text-center">
                    <input
                      className=" flex-auto rounded-lg  border-2"
                      type="number" // change the type to "number"
                      style={{
                        maxWidth: "35%",
                        borderColor: "#000",
                        cursor: "zoom-in",
                      }}
                      value={ValueOrder1}
                      step="0.0001" // bind the value of the input field to the same value as the slider
                      max={wethBalance}
                      onChange={(event) => {
                        setValueOrder1(event.target.value);
                        setValueOrder(
                          (
                            event.target.value *
                            (selected.name == "LODGE"
                              ? lodgelpratio
                              : levellpratio)
                          ).toFixed(6)
                        ); // update the value of the slider when the input field value changes
                      }}
                    />
                  </div>
                </div>
                <div class=" inline-flex  text-center justify-center items-center justify-self-center">
                  <img
                    class="text-center h-36  rounded-full"
                    src={
                      "https://media.tenor.com/9SQD7cT_c2sAAAAd/lodgecapital.gif"
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  {(selected.name == "LODGE"
                    ? lodgeAllowance
                    : levelAllowance) < ValueOrder ? (
                    <button
                      onClick={() =>
                        selected.name == "LODGE"
                          ? approveWriteLodge?.()
                          : approveWrite?.()
                      }
                      className="text-xl text-center justify-self-center flex-auto m-2    rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out"
                    >
                      approve {selected.name}
                    </button>
                  ) : (
                    <div></div>
                  )}{" "}
                  {wethAllowance < ValueOrder1 ? (
                    <button
                      onClick={() => approveWriteWETH?.()}
                      className="text-xl text-center justify-self-center flex-auto m-2    rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out"
                    >
                      &nbsp;approve WETH&nbsp;
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <button
                  onClick={() => supplyWrite?.()}
                  disabled={
                    selected.name == "LODGE"
                      ? lodgeAllowance < ValueOrder
                      : levelAllowance < ValueOrder
                  }
                  className="text-xl text-center justify-self-center flex-auto m-2 disabled:hidden   rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out"
                >
                  supply
                </button>
              </div>
            ) : (
              <div className=" m-2 flex flex-col max-w-4xl px-4 py-6 sm:px-6 bg-white bg-opacity-70  items-center rounded-xl lg:pl-8 xl:flex-1 xl:pl-6">
                <div className=" text-xl ">Remove Liquidity tax free</div>
                <div className="flex mt-4 flex-nowrap w-full gap-8">
                  {" "}
                  <div className=" text-center items-center justify-between flex-auto">
                    <div className="">
                      <Listbox value={selected1} onChange={setSelected1}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg mb-2 bg-white py-2 xl:w-1/4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate text-center text-black">
                              {selected1.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute left-1/2  transform -translate-x-1/2 mt-1 max-h-60 w-full xl:w-1/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {people1.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-black text-white scale:110"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected1 }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected1
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected1 ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
                Available{" "}
                {selected1.name === "LODGE/WETH"
                  ? lodgeLpBalance
                  : levelLpBalance}{" "}
                {selected1.name} LP{" "}
                <div className="flex  items-center mt-4 flex-wrap w-full gap-6 sm:gap-8">
                  <div className="w-full flex-auto text-center">
                    <input
                      className="accent-black w-1/4 "
                      type="range"
                      w-full="true"
                      min="0"
                      max={ethers.utils.formatEther("800000000000000000000")}
                      step="0.01"
                      value={ValueOrder}
                      onChange={(event) => {
                        setValueOrder(event.target.value);
                      }}
                      list="tickmarks1"
                    />

                    <input
                      className=" flex-auto rounded-lg  border-2"
                      type="number" // change the type to "number"
                      style={{
                        maxWidth: "15%",
                        borderColor: "#000",
                        cursor: "zoom-in",
                      }}
                      value={ValueOrder}
                      step="0.01" // bind the value of the input field to the same value as the slider
                      max={ethers.utils.formatUnits(8, "ether")}
                      onChange={(event) => {
                        setValueOrder(event.target.value); // update the value of the slider when the input field value changes
                      }}
                    />
                  </div>
                </div>
                <div className="flex mt-4 flex-nowrap w-full gap-8">
                  <div className=" text-center items-center justify-between flex-auto">
                    You'll get 0.00 {selected1.name.slice(0, 5)}
                  </div>{" "}
                  <div className=" text-center items-center justify-between flex-auto">
                    You'll get 0.00 ETH
                  </div>
                </div>
                <div class=" inline-flex  text-center justify-center items-center justify-self-center">
                  <img
                    class="text-center h-36  rounded-full"
                    src={
                      "https://media.tenor.com/9SQD7cT_c2sAAAAd/lodgecapital.gif"
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button className="text-xl text-center justify-self-center flex-auto m-2    rounded-lg p-0.5 px-20 sm:px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out">
                    &nbsp;break 0 {selected1.name} LP&nbsp;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <ExampleFF className="sticky top-[100vh] z-50" />
      </main>
    </>
  );
}
