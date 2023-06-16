import Head from "next/head";

import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/myHeader.jsx";
import Header1 from "../components/Header.jsx";
import { Doughnut } from "react-chartjs-2";
const inter = Inter({ subsets: ["latin"] });
const logo = require("../images/lodge-crest-1.png");
import { Chart, ArcElement } from "chart.js";
import ExampleCCC from "../components/nochart.jsx";
import ExampleNS from "@/components/NewsLetter.jsx";
import Example from "@/components/MyChart.jsx";
import Example1 from "@/components/chartarea.jsx";
import Example2 from "@/components/myList.jsx";
import ExampleHeader from "@/components/thheader.jsx";
import ExampleC from "@/components/Chart2.jsx";
import ExampleFF from "@/components/footer.jsx";
import {
  UsersIcon,
  EnvelopeOpenIcon,
  CursorArrowRaysIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

import { CheckIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function DashBoard2() {
  Chart.register(ArcElement);
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 8,
      },
    ],
  };
  const stats = [
    {
      id: 1,
      name: "Total BUSD Rewarded",
      stat: "$21,897",
      icon: BanknotesIcon,
      change: "",
      changeType: "increase",
    },
    {
      id: 2,
      name: "Total Value Locked",
      stat: "$60,000",
      icon: CurrencyDollarIcon,
      change: "5.4%",
      changeType: "increase",
    },
    {
      id: 3,
      name: "Avg. Lock Time",
      stat: "1,3 Years",
      icon: ClockIcon,
      change: "3.2%",
      changeType: "decrease",
    },
  ];

  return (
    <>
      <Head>
        <title>Lodge Capital</title>
        <meta name="description" content="Lodge Capital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[url('https://cdn.discordapp.com/attachments/943951700379721740/1075814264163541122/lodge-bg.png')] w-screen min-h-screen  bg-no-repeat bg-cover bg-center bg-fixed">
        <div className="flex flex-wrap flex-col">
          <ExampleHeader className="" />

          <div>
            <dl className="mt-5  sm:grid grid-cols-3 gap-5 sm:grid-cols-3 lg:grid-cols-3 bg-transparent">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white radial-gradient(at right center, rgb(56, 189, 248), rgb(49, 46, 129)) px-4 pt-5 mb-4 ml-2 mr-6  shadow sm:px-6 sm:pt-6 border-2 border-black"
                >
                  <dt>
                    <div className="absolute rounded-md bg-black p-3">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-black">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-black">
                      {item.stat}
                    </p>
                    <p
                      className={classNames(
                        item.changeType === "increase"
                          ? "text-black"
                          : "text-black",
                        "ml-2 flex items-baseline text-sm font-semibold"
                      )}
                    >
                      {item.changeType === "increase" ? (
                        <ArrowUpIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-black"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-black"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {" "}
                        {item.changeType === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span>
                      {item.change}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-transparent px-4 py-4 sm:px-6">
                      <div className="text-sm"></div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="isolate  grid  grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div className={classNames("col-span-2", " p-8 xl:p-10")}>
            <Example />
          </div>

          <div className={classNames("col-span-2", " p-8 xl:p-10")}>
            <ExampleC />
          </div>
        </div>

        <ExampleFF className=" sticky top-[100vh]" />
      </main>
    </>
  );
}
