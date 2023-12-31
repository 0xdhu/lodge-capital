import Head from "next/head";
import { useContractRead, WagmiConfig, useAccount } from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import ZapperDepositModal from "@/components/ZapperModal.jsx";
import BUSDABI from "@/constants/BUSDABI.json";
import { ethers } from "ethers";
import { DeadAddress, ContractAddressList } from "@/constants/index.js";
import useRefreshHook from '@/hook/refresh';
import ExampleHeader from "@/components/thheader";
import ExampleFF from "@/components/footer";

const {
  chainId: arbChainId,
  levelTokenAddress,
  lodgeTokenAddress,
  ethLodgeLpTokenAddress,
  ethLevelLpTokenAddress,
  wethTokenAddress,
  usdcTokenAddress,
  usdtTokenAddress,
  daiTokenAddress
} = ContractAddressList;

const people = [
  {
    index: 0,
    name: "LEVEL",
    address: levelTokenAddress,
  },
  {
    index: 1,
    name: "LODGE",
    address: lodgeTokenAddress,
  },
  {
    index: 2,
    name: "LEVEL/WETH",
    address: ethLevelLpTokenAddress,
  },
  {
    index: 3,
    name: "LODGE/WETH",
    address: ethLodgeLpTokenAddress,
  },
  {
    index: 4,
    name: "WETH",
    address: wethTokenAddress,
  },
  {
    index: 5,
    name: "USDC",
    address: usdcTokenAddress,
  },
  {
    index: 6,
    name: "USDT",
    address: usdtTokenAddress,
  },
  {
    index: 7,
    name: "DAI",
    address: daiTokenAddress,
  },
];
const people1 = [
  {
    index: 0,
    name: "LEVEL",
    address: levelTokenAddress,
  },
  {
    index: 1,
    name: "LODGE",
    address: lodgeTokenAddress,
  },
  {
    index: 2,
    name: "LEVEL/WETH",
    address: ethLevelLpTokenAddress,
  },
  {
    index: 3,
    name: "LODGE/WETH",
    address: ethLodgeLpTokenAddress,
  },
  {
    index: 4,
    name: "WETH",
    address: wethTokenAddress,
  },
  {
    index: 5,
    name: "USDC",
    address: usdcTokenAddress,
  },
  {
    index: 6,
    name: "USDT",
    address: usdtTokenAddress,
  },
  {
    index: 7,
    name: "DAI",
    address: daiTokenAddress,
  },
];

export default function Zapper() {
  const { refreshCount } = useRefreshHook(60000);

  const [selected, setSelected] = useState(people[0]);
  const [selected1, setSelected1] = useState(people1[0]);
  const [balance, setBalance] = useState(0);
  const [balance1, setBalance1] = useState(0);
  const { address } = useAccount();

  const token1BalanceRead = useContractRead({
    address: selected.address,
    abi: BUSDABI,
    functionName: "balanceOf",
    args: [address || DeadAddress],
    chainId: arbChainId,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const token2BalanceRead = useContractRead({
    address: selected1.address,
    abi: BUSDABI,
    functionName: "balanceOf",
    args: [address || DeadAddress],
    chainId: arbChainId,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  async function updateUI() {
    try {
      const rdep = (token1BalanceRead.data || 0).toString();
      setBalance(
        selected.name == "USDC" || selected.name == "USDT"
          ? ethers.utils.formatUnits(rdep, 6)
          : ethers.utils.formatEther(rdep)
      );
    } catch {}
    try {
      const read1 = (token2BalanceRead.data || 0).toString();
      setBalance1(
        selected1.name == "USDC" || selected1.name == "USDT"
          ? ethers.utils.formatUnits(read1, 6)
          : ethers.utils.formatEther(read1)
      );
    } catch {}
  }
  useEffect(() => {
    updateUI();
  }, [refreshCount]);

  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1075814264163541122/lodge-bg.png')] w-screen  min-h-screen  bg-no-repeat bg-cover bg-center ">
        <ExampleHeader />

        <div className="text-white  gap-6 lg:grid grid-cols-2 lg:grid-cols-12 grid-rows-1 lg:grid-rows-6 lg:gap-1">
          <div className="flex-auto font-lodge text-5xl col-start-5 col-span-4 row-start-2 text-center ">
            LODGE ZAPPER
          </div>
          <div className="flex-auto  font-lodge text-xl col-start-6 col-span-2 row-start-3 text-center "></div>

          <div className=" rounded-xl text-black   flex-auto m-10 md:mx-60 lg:m-10 sm:mx-52 text-xl 2xl:col-start-3 2xl:col-span-3 lg:col-span-3 lg:col-start-3 row-start-3 row-span-3  text-center  bg-white  ">
            Input token
            <div className="text-lg m-2">
              <div className=" inline-flex  text-center justify-center items-center justify-self-center">
                <img
                  className="text-center h-24 bg-white rounded-full"
                  src={
                    "https://media.tenor.com/9SQD7cT_c2sAAAAd/lodgecapital.gif"
                  }
                />
              </div>
              <div className="">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-black">
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
                                    selected ? "font-medium" : "font-normal"
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
            <div className="text-lg m-2 mt-10">
              {selected.name} Available : {(balance * 1).toLocaleString()}
            </div>
            <div className="flex-auto m-2"></div>
          </div>
          <div className="rounded-xl text-black  flex-auto   m-10 md:mx-60 lg:m-10 sm:mx-52 text-xl 2xl:col-start-8 2xl:col-span-3 lg:col-start-8 lg:col-span-3 row-start-3 row-span-3  text-center bg-white    ">
            Output token
            <div className="m-1">
              <div className=" inline-flex  text-center justify-center items-center justify-self-center">
                <img
                  className="text-center h-24 bg-white rounded-full"
                  src={"https://media.tenor.com/1NNu4kkLgxoAAAAC/lodge.gif"}
                />
              </div>
              <div className="">
                <Listbox value={selected1} onChange={setSelected1}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-black">
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
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people1.map((person1, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-black text-white" : "text-gray-900"
                              }`
                            }
                            value={person1}
                          >
                            {({ selected1 }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected1 ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person1.name}
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
            <div className="text-lg m-2 mt-10">
              {selected1.name} Available : {(balance1 * 1).toLocaleString()}
            </div>
          </div>
          <div className="row-start-4 col-start-6 col-span-2  text-center inline-flex justify-center  ">
            <img
              className="h-20"
              src={
                "https://cdn.pixabay.com/photo/2012/04/11/10/24/arrow-27324_960_720.png"
              }
            ></img>
          </div>
          <div className="flex-auto row-start-5 col-start-6  col-span-2 text-center ">
            <ZapperDepositModal
              index={selected.index}
              index2={selected1.index}
            />
          </div>
        </div>
        <div className="text-lg   text-center text-white ">
          The zapper will tax you on any sell transaction, but not in liquidity
          addition or removal
        </div>

        <ExampleFF className="sticky top-[100vh]" />
      </main>
    </>
  );
}
