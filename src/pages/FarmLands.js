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
  useContractReads,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import ShareRewardPoolABI from "@/constants/ShareRewardPoolABI.json";
import BUSDABI from "@/constants/BUSDABI.json";
import DepositModal from "@/components/FarmsDepositModal.jsx";
import WithdrawModal from "@/components/FarmsWithdrawModal.jsx";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ChainlinkFEEDABI from "@/constants/ChainlinkFEEDABI.json";
import SLPABI from "@/constants/SLPABI.json";

export default function Masonry() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [pendingLODGEETH, setPendingLODGEETH] = useState(0);
  const [pendingETHLEVEL, setPendingETHLEVEL] = useState(0);
  const [pendingLEVEL, setPendingLEVEL] = useState(0);
  const [usersLODGEETH, setUsersLODGEETH] = useState(0);
  const [usersETHLEVEL, setUsersETHLEVEL] = useState(0);
  const [usersLEVEL, setUsersLEVEL] = useState(0);
  const [TVLLODGEETH, setTVLLODGEETH] = useState(0);
  const [TVLETHLEVEL, setTVLETHLEVEL] = useState(0);
  const [TVLLEVEL, setTVLLEVEL] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const [lpPrice, setLpPrice] = useState(0);
  const [lpSupply, setLpSupply] = useState(0);
  const [lpPricelg, setLpPricelg] = useState(0);
  const [lpSupplylg, setLpSupplylg] = useState(0);
  const [levelPrice, setLevelPrice] = useState(0);
  const [lodgePrice, setLodgePrice] = useState(0);

  const [lodgeethAlloc, setLodgeethAlloc] = useState(0);
  const [ethlevelAlloc, setEthlevelAlloc] = useState(0);
  const [levelAlloc, setLevelAlloc] = useState(0);
  const [totalAllocation, setTotalAllocation] = useState(0);

  const shareRewardPoolAddress = "0x6a8d3350faC7114de8a69333A88f2bD68A43C19E";
  const lodgelpAddress = "0xc40d7d423d788eeecd801b634480a86596388c65";
  const levelEthAddress = "0x623f44f9fae979e1099c6ca6a841a3b0163edc06";
  const levelAddress = "0x0E5c5De023fe05aD4858714E0f58b0cB98718b1D";
  const lodgePerSecond = 0.0009384384;

  const pendinglodgeeth = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "pendingShare",
    chainId: 42161,
    args: [1, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lodgethtvl = useContractRead({
    address: lodgelpAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [shareRewardPoolAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const userlodgeeth = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [1, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const pendingETHLVL = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "pendingShare",
    chainId: 42161,
    args: [0, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHLEVELTVL = useContractRead({
    address: levelEthAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [shareRewardPoolAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const userETHLEVEL = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [0, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const pendingLVL = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "pendingShare",
    chainId: 42161,
    args: [2, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const LEVELTVL = useContractRead({
    address: levelAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [shareRewardPoolAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const userLEVEL = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [2, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ethPriceRead = useContractRead({
    address: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lpreservesReadlvl = useContractRead({
    address: levelEthAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpSupplyReadlvl = useContractRead({
    address: levelEthAddress,
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const lpreservesReadlodge = useContractRead({
    address: lodgelpAddress,
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpSupplyReadlodge = useContractRead({
    address: lodgelpAddress,
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const levelEthAllocRead = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [0],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lodgethAllocRead = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [1],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelAllocRead = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [2],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const totalAllocRead = useContractRead({
    address: shareRewardPoolAddress,
    abi: ShareRewardPoolABI,
    functionName: "totalAllocPoint",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

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
        {`Succesfully approved ${selectedToken.name} !  `}{" "}
        <a
          href={`https://arbiscan.com/tx/${approveData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const { config, error, refetch } = usePrepareContractWrite({
    address: "0xaAF9c2bd005A8da9536be9EA7A5F2034314a32B8",
    abi: ShareRewardPoolABI,
    functionName: "deposit",
    chainId: 421613,
    args: [0, 0],
  });
  const { write, isSuccess, data, isLoading, reset } = useContractWrite({
    ...config,
    onSuccess: notify2,
  });

  const unwatch = watchBlockNumber(
    {
      chainId: 421613,
    },
    (blockNumber) => console.log(blockNumber)
  );

  async function updateUI() {
    try {
      const rdep = (pendinglodgeeth.data || 0).toString();
      setPendingLODGEETH(ethers.utils.formatEther(rdep));
    } catch {}
    try {
      const rdep2 = (userlodgeeth.data[0] || 0).toString();
      setUsersLODGEETH(ethers.utils.formatEther(rdep2));
    } catch {}
    try {
      const rdep3 = (lodgethtvl.data || 0).toString();
      setTVLLODGEETH(ethers.utils.formatEther(rdep3));
    } catch {}
    try {
      const rdep4 = (pendingLVL.data || 0).toString();
      setPendingLEVEL(ethers.utils.formatEther(rdep4));
    } catch {}
    try {
      const rdep5 = (userLEVEL.data[0] || 0).toString();
      setUsersLEVEL(ethers.utils.formatEther(rdep5));
    } catch {}
    try {
      const rdep6 = (LEVELTVL.data || 0).toString();
      setTVLLEVEL(ethers.utils.formatEther(rdep6));
    } catch {}
    try {
      const rdep7 = (userETHLEVEL.data[0] || 0).toString();
      setUsersETHLEVEL(ethers.utils.formatEther(rdep7));
    } catch {}
    try {
      const rdep8 = (pendingETHLVL.data || 0).toString();
      setPendingETHLEVEL(ethers.utils.formatEther(rdep8));
    } catch {}
    try {
      const rdep9 = (ETHLEVELTVL.data || 0).toString();
      setTVLETHLEVEL(ethers.utils.formatEther(rdep9));
    } catch {}
    try {
      const read20 = (ethPriceRead.data || 0).toString();
      setEthPrice(ethers.utils.formatUnits(read20, 8));
    } catch {}
    try {
      const read23 = lpreservesReadlvl.data[1] || 0;
      const read24 = lpSupplyReadlvl.data;
      setLpSupply(ethers.utils.formatEther(read24.toString()));
      const mul = read23 * 2;
      setLpPrice(ethers.utils.formatEther(mul.toString()));

      const read25 = lpreservesReadlodge.data[1] || 0;
      const read26 = lpSupplyReadlodge.data;
      setLpSupplylg(ethers.utils.formatEther(read26.toString()));
      const mul1 = read25 * 2;
      setLpPricelg(ethers.utils.formatEther(mul1.toString()));
      const read27 = lpreservesReadlodge.data[0] || 1;
      setLodgePrice(read25 / read27);

      const read28 = lpreservesReadlvl.data[0] || 1;
      setLevelPrice(read23 / read28);
    } catch {}

    try {
      const read29 = (lodgethAllocRead.data[1] || 0).toString();
      setLodgeethAlloc(read29);
    } catch {}
    try {
      const read30 = (levelEthAllocRead.data[1] || 0).toString();
      setEthlevelAlloc(read30);
    } catch {}
    try {
      const read31 = (levelAllocRead.data[1] || 0).toString();
      setLevelAlloc(read31);
    } catch {}

    try {
      const read32 = (totalAllocRead.data || 0).toString();
      setTotalAllocation(read32);
    } catch {}
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
              Farms & Staking{" "}
            </div>
            <div className=" flex-auto text-left">LODGE TO HARVEST: </div>
            <div className=" flex-auto text-left text-xl">
              {(
                parseFloat(pendingETHLEVEL) +
                parseFloat(pendingLODGEETH) +
                parseFloat(pendingLEVEL)
              ).toLocaleString()}
            </div>
            <div className=" flex-auto  text-left">
              ${" "}
              {(
                (parseFloat(pendingETHLEVEL) +
                  parseFloat(pendingLODGEETH) +
                  parseFloat(pendingLEVEL)) *
                lodgePrice *
                ethPrice
              ).toLocaleString()}
            </div>
            <div className=" flex-auto font-bold text-xl text-right">
              {" "}
              ${" "}
              {(
                TVLETHLEVEL * (lpPrice / lpSupply || 1) +
                TVLLODGEETH * (lpPricelg / lpSupplylg || 1) +
                TVLLEVEL * (levelPrice * ethPrice)
              ).toLocaleString()}{" "}
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
                <div className="flex-auto  w-2">LEVEL/ETH</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    {(
                      (lodgePerSecond *
                        lodgePrice *
                        ethPrice *
                        31556926 *
                        ethlevelAlloc) /
                      totalAllocation /
                      (TVLETHLEVEL * lpPrice * ethPrice)
                    ).toLocaleString()}
                    %
                  </div>
                </div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    {(
                      (lodgePerSecond *
                        parseFloat(lodgePrice) *
                        parseFloat(ethPrice) *
                        31556926 *
                        parseFloat(ethlevelAlloc)) /
                      parseFloat(totalAllocation) /
                      parseFloat(TVLETHLEVEL * lpPrice * ethPrice) /
                      365
                    ).toLocaleString()}
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    ${(TVLETHLEVEL * lpPrice * ethPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>
                    {" "}
                    {(usersETHLEVEL * lpPrice * ethPrice).toLocaleString()}
                  </div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 mb-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: $
                  {(pendingETHLEVEL * lodgePrice * ethPrice).toLocaleString()}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Claim
                </button>
                <DepositModal index={0} />
                <WithdrawModal index={0} />
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
                </div>{" "}
                <div className="flex-auto  w-2">LODGE/ETH</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    {(
                      (0.0009384384 *
                        parseFloat(lodgePrice) *
                        parseFloat(ethPrice) *
                        31556926 *
                        parseFloat(lodgeethAlloc)) /
                      parseFloat(totalAllocation) /
                      parseFloat(TVLLODGEETH * lpPricelg)
                    ).toLocaleString()}
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div> daily APR</div>
                  <div>
                    {(
                      (0.0009384384 *
                        parseFloat(lodgePrice) *
                        parseFloat(ethPrice) *
                        31556926 *
                        parseFloat(lodgeethAlloc)) /
                      parseFloat(totalAllocation) /
                      parseFloat(TVLLODGEETH * lpPricelg) /
                      365
                    ).toLocaleString()}
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    ${(TVLLODGEETH * lpPricelg * ethPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>
                    {" "}
                    {(usersLODGEETH * lpPricelg * ethPrice).toLocaleString()}
                  </div>
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
                  {(pendingLODGEETH * lodgePrice * ethPrice).toLocaleString()}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto ">
                  Claim
                </button>
                <DepositModal index={1} />
                <WithdrawModal index={1} />
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
                </div>{" "}
                <div className="flex-auto  w-2">LEVEL</div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    {(
                      (lodgePerSecond *
                        lodgePrice *
                        ethPrice *
                        31556926 *
                        levelAlloc) /
                      totalAllocation /
                      (TVLLEVEL * levelPrice * ethPrice)
                    ).toLocaleString()}
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col ">
                  {" "}
                  <div> daily APR</div>
                  <div>
                    {(
                      (lodgePerSecond *
                        lodgePrice *
                        ethPrice *
                        31556926 *
                        levelAlloc) /
                      totalAllocation /
                      (TVLLEVEL * levelPrice * ethPrice) /
                      365
                    ).toLocaleString()}
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    ${(TVLLEVEL * levelPrice * ethPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div> <div> {usersLEVEL.toLocaleString()}</div>
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
                  {(pendingLEVEL * lodgePrice * ethPrice).toLocaleString()}
                </div>{" "}
                <button className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black ">
                  Claim
                </button>
                <DepositModal index={2} />
                <WithdrawModal index={2} />
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
