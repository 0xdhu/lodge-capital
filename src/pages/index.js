import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/myHeader.jsx";
import Header1 from "../components/Header.jsx";
const inter = Inter({ subsets: ["latin"] });
import Modal from "@/components/lolz.jsx";
const logo = require("./lodge-crest-1.png");
import DuesPresaleABI from "@/constants/DuesPresaleABI.json";
import LevelPresaleABI from "@/constants/LevelPresaleABI.json";
import { ethers, BigNumber } from "ethers";

import ExampleH from "@/components/heroex.jsx";

import ExampleHeader from "@/components/thheader.jsx";
import ExampleFF from "@/components/footer.jsx";
import { CallToAction } from "@/components/CallToAction.jsx";
import Examplejjj from "@/components/mymodal.jsx";
import { useEffect, useState } from "react";
import MyModal from "@/components/mymodal.jsx";
import LevelModal from "@/components/levelModal.jsx";
import WildCardModal from "@/components/WCmodal.jsx";
import { useContractRead, WagmiConfig } from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import ExampleCA from "@/components/contestAlert.jsx";
import ExampleCAR from "@/components/errorallert.jsx";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [DuesSold, setDuesSold] = useState(0);
  const [LevelSold, setLevelSold] = useState(0);
  function handleOpen() {
    setIsOpen(true);
  }
  const ContractRead = useContractRead({
    address: "0x15b13C33112ea6Bffef1b77Bc0985e718A85c5Ea",
    abi: DuesPresaleABI,
    functionName: "getRoundDeposits",
    chainId: 42161,
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  // const ContractRead1 = useContractRead({
  //   address: "0xc232db797D048B9e3e28B71F78d996E04B5aC2a9",
  //   abi: LevelPresaleABI,
  //   functionName: "getRoundDeposits",
  //   chainId: 42161,
  //   watch: true,
  //   onSuccess(data1) {
  //     console.log("Success", data1);
  //   },
  // });
  const unwatch = watchBlockNumber(
    {
      chainId: 42161,
    },
    (blockNumber) => console.log(blockNumber)
  );

  // async function updateUI() {
  //   if (!ContractRead || !ContractRead.data) {
  //     return;
  //   }
  //   if (!ContractRead1 || !ContractRead1.data) {
  //     return;
  //   }
  //   const rdep = ContractRead.data.toString();
  //   const rdep1 = ContractRead1.data.toString();
  //   setLevelSold(rdep1);
  //   setDuesSold(rdep);
  // }
  useEffect(() => {
    // updateUI();
  }, [unwatch]);

  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Lodge Capital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {/* <main className="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1075814264163541122/lodge-bg.png')] font-Montserrat  w-screen h-100% min-h-screen  bg-no-repeat bg-cover bg-center bg-fixed">
        <ExampleHeader /> <ExampleCA /> <Modal />
        <div className="  text-white md:grid grid-cols-12 grid-rows-6 gap-4 text-center">
          <h1 className=" col-span-12 row-span-1  row-start-2 inline-flex flex-auto    text-center justify-center text-2xl sm:text-6xl font-lodge">
            DUES AND LEVEL PRESALE
          </h1>
          <div className="row-start-3 col-start-7   col-span-3 text-center  font-semibold text-lg sm:text-2xl mx-8  ">
            SOLD{" "}
            {(
              77317 +
              Math.round(ethers.utils.formatUnits(LevelSold, "ether") / 0.33)
            ).toLocaleString()}{" "}
            LEVEL OUT OF 99,999
            <div className="flex w-full h-8 sm:h-12 row-start-3 border-white border-4   col-start-7 col-span-2 bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700">
              <div
                className="flex flex-col justify-center   overflow-hidden bg-black text-xs text-white text-center"
                role="progressbar"
                style={{
                  width: `${
                    (100 *
                      (77317 +
                        Math.round(
                          ethers.utils.formatUnits(LevelSold, "ether") / 0.33
                        ))) /
                    99999
                  }%`,
                }}
                aria-valuenow={
                  77317 +
                  Math.round(
                    ethers.utils.formatUnits(LevelSold, "ether") / 0.33
                  )
                }
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(
                  (100 *
                    (77317 +
                      ethers.utils.formatUnits(LevelSold, "ether") / 0.33)) /
                    99999
                )}
                %
              </div>
            </div>
          </div>
          <div className=" row-start-3 col-start-4 col-span-3  row-span-2 text-center text-lg sm:text-2xl  font-semibold  mx-8">
            {" "}
            SOLD{" "}
            {474.507 +
              Math.round(
                (100 * ethers.utils.formatUnits(DuesSold, "ether")) / 333
              ) /
                100}{" "}
            DUES OUT OF 580.00
            <div className="flex row-start-3 col-start-5 border-white border-4    col-span-2 w-full h-8 sm:h-12 bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700">
              <div
                className="flex flex-col justify-center overflow-hidden   bg-black  text-xs text-white text-center"
                role="progressbar"
                style={{
                  width: `${
                    (100 *
                      (474.507 +
                        ethers.utils.formatUnits(DuesSold, "ether") / 333)) /
                    580
                  }%`,
                }}
                aria-valuenow={
                  474.507 +
                  Math.round(
                    (100 * ethers.utils.formatUnits(DuesSold, "ether")) / 333
                  ) /
                    100
                }
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(
                  (100 *
                    (473.507 +
                      (100 * ethers.utils.formatUnits(DuesSold, "ether")) /
                        333 /
                        100)) /
                    580
                )}
                %
              </div>
            </div>
          </div>

          <div className="row-start-5 col-start-1  col-span-12 text-white text-2xl sm:text-5xl text-center">
            {" "}
            DUES HAS ZERO TEAM TOKENS
            <div>A 100% FAIR LAUNCH</div>
            <div className="row-start-5 col-start-1 col-span-12 text-white text-xs sm:text-base text-center font-bold">
              THE ONLY DUES IN CIRCULATION ARE THOSE PURCHASED IN PRESALE AND
              VESTING
            </div>
          </div>

          <MyModal></MyModal>
          <WildCardModal></WildCardModal>
          <LevelModal></LevelModal>

          <div className="row-start-7  col-start-1 col-span-12 text-white text-2xl sm:text-5xl text-center">
            {" "}
            VESTING OPTIONS
            <div className="row-start-5 col-start-1 col-span-12 text-white text-xs sm:text-xl text-center font-bold">
              DUES: 15% UPON LAUNCH + 4% PER DAY VESTED LINEARLY.
            </div>
            <div className="row-start-5 col-start-1 col-span-12 text-white text-xs sm:text-xl text-center font-bold animate-fade-out ">
              LEVEL: 100% OF YOUR LEVEL WILL BE AVAILABLE UPON LAUNCH.
            </div>
          </div>
        </div>
        <CallToAction className="overflow-hidden" />
        <ExampleFF className="sticky top-[100vh]" /> 
      </main> */}
    </>
  );
}
