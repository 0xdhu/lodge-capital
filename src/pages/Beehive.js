import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/myHeader.jsx";
import Header1 from "../components/Header.jsx";
import Modal2 from "@/components/Lmodal.jsx";
const inter = Inter({ subsets: ["latin"] });
const logo = require("../images/cake-busd.png");
const logo1 = require("../images/busd-icon.png");
const logo2 = require("../images/level-icon.png");
import ExampleHeader from "@/components/thheader.jsx";
import ExampleCards from "@/components/myCards.jsx";
import ExampleFF from "@/components/footer";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import BeehiveModal from "@/components/Beehivemodal.jsx";
export default function Beehive() {
  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Lodge Capital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1084061637037797396/sun.png')] bg-black w-screen h-100%  bg-no-repeat bg-cover bg-center   min-h-screen ">
        <ExampleHeader />

        <ExampleCards className="mb-96" />

        <BeehiveModal />
        <ExampleFF className=" sticky top-[100vh]" />
      </main>
    </>
  );
}
