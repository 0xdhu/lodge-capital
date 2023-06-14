import Head from "next/head";
import Image from "next/image";
import { Inter, Trykker } from "@next/font/google";
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

import { ethers } from "ethers";
import BoardRoomABI from "@/constants/BoardRoomABI.json";
import ChainlinkFEEDABI from "@/constants/ChainlinkFEEDABI.json";
import SLPABI from "@/constants/SLPABI.json";
import toast, { Toaster } from "react-hot-toast";
import NumberFormat from "@/components/NumFormater.jsx";

export default function Masonry() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [usdcTVL, setUsdcTVL] = useState(0);
  const [ethTVL, setEthTVL] = useState(0);
  const [daiTVL, setDaiTVL] = useState(0);
  const [sushiTVL, setSushiTVL] = useState(0);
  const [arbTVL, setArbTVL] = useState(0);
  const [ethLevelTVL, setEthLevelTVL] = useState(0);
  const [usdtTVL, setUsdtTVL] = useState(0);

  const [userSushi, setUserSushi] = useState(0);
  const [userEth, setUserEth] = useState(0);
  const [userArb, setUserArb] = useState(0);
  const [userETHLEVEL, setUserETHLEVEL] = useState(0);
  const [userDAI, setUserDAI] = useState(0);
  const [userUSDC, setUserUSDC] = useState(0);
  const [userUSDT, setUserUSDT] = useState(0);

  const [pendingSushi, setPendingSushi] = useState(0);
  const [pendingEth, setPendingEth] = useState(0);
  const [pendingArb, setPendingArb] = useState(0);
  const [pendingETHLEVEL, setPendingETHLEVEL] = useState(0);
  const [pendingDAI, setPendingDAI] = useState(0);
  const [pendingUSDC, setPendingUSDC] = useState(0);
  const [pendingUSDT, setPendingUSDT] = useState(0);

  const [ethallocation, setEthAllocation] = useState(0);
  const [sushiallocation, setSushiAllocation] = useState(0);
  const [arballocation, setArbAllocation] = useState(0);
  const [ethlevelallocation, setEthLevelAllocation] = useState(0);
  const [daiallocation, setDaiAllocation] = useState(0);
  const [usdcallocation, setUsdcAllocation] = useState(0);
  const [usdtallocation, setUsdtAllocation] = useState(0);
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [total, setTotal] = useState(0);

  const [nativePrice, setNativePrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [arbPrice, setArbPrice] = useState(0);
  const [sushiPrice, setSushiPrice] = useState(0);
  const [lpPrice, setLpPrice] = useState(0);
  const [lpSupply, setLpSupply] = useState(0);
  const genesisAddress = "0x92B50A816A2ff5D10d6654260d296aC318B647A8";
  const levelPerSecond = 0.77159722222;
  const notify2 = () => toast(<div> Transaction sent! </div>);
  const {
    config: wethClaimConfig,
    error,
    refetch,
  } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [0, 0],
  });
  const {
    write: claimWethWrite,
    isSuccess: claimWethSuccess,
    data: claimWethData,
    isLoading: claimWethLoading,
    writeAsync: claimWethWriteAsync,
  } = useContractWrite({
    ...wethClaimConfig,
    onSuccess: notify2,
  });
  const {
    config: sushiClaimConfig,
    error: sushiError,
    refetch: sushiRefetch,
  } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [1, 0],
  });
  const {
    write: sushiClaimWrite,
    isSuccess,
    data: sushiClaimData,
    isLoading,
    reset,
    writeAsync: sushiClaimWriteAsync,
  } = useContractWrite({
    ...sushiClaimConfig,
  });

  const {
    config: arbClaimConfig,
    error: arbError,
    refetch: arbRefetch,
  } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [2, 0],
  });
  const {
    write: claimArbWrite,
    isSuccess: claimArbSuccess,
    data: claimArbData,
    isLoading: claimArbLoading,
    writeAsync: claimArbWriteAsync,
  } = useContractWrite({
    ...arbClaimConfig,
  });

  const { config: usdtClaimConfig } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [4, 0],
  });
  const {
    write: claimUsdtWrite,
    data: claimusdtData,
    writeAsync: claimUsdtWriteAsync,
  } = useContractWrite({
    ...usdtClaimConfig,
  });

  const { config: usdcClaimConfig } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [3, 0],
  });
  const {
    write: claimUsdcWrite,
    data: claimUsdcData,
    writeAsync: claimUsdcWriteAsync,
  } = useContractWrite({
    ...usdcClaimConfig,
  });
  const { config: daiClaimConfig } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [3, 0],
  });
  const {
    write: claimDaiWrite,
    data: claimDaiData,
    writeAsync: claimDaiWriteAsync,
  } = useContractWrite({
    ...daiClaimConfig,
  });
  const { config: lvlClaimConfig } = usePrepareContractWrite({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "deposit",
    chainId: 42161,
    args: [3, 0],
  });
  const {
    write: claimLvlWrite,
    data: claimLvlData,
    writeAsync: claimLvlWriteAsync,
  } = useContractWrite({
    ...lvlClaimConfig,
  });
  const notify3 = () =>
    toast.error(
      <div>
        {" "}
        <div>Something went horrible !</div>
      </div>
    );

  const notify1 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingSushi} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${sushiClaimData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const notify4 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingArb} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimArbData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );

  const notify5 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingDAI} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimDaiData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const notify6 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingETHLEVEL} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimLvlData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const notify7 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingUSDT} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimusdtData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );

  const notify8 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingUSDC} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimUsdcData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  const notify9 = () =>
    toast.success(
      <div>
        {`Succesfully claimed ${pendingEth} LEVEL!  `}{" "}
        <a
          href={`https://arbiscan.io/tx/${claimWethData?.hash}`}
          className="underline"
        >
          arbiscan
        </a>
      </div>
    );
  useWaitForTransaction({
    chainId: 42161,
    hash: claimArbData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });
  useWaitForTransaction({
    chainId: 42161,
    hash: claimDaiData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });
  useWaitForTransaction({
    chainId: 42161,
    hash: claimUsdcData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });
  useWaitForTransaction({
    chainId: 42161,
    hash: claimusdtData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });

  useWaitForTransaction({
    chainId: 42161,
    hash: claimWethData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });
  useWaitForTransaction({
    chainId: 42161,
    hash: claimLvlData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });
  useWaitForTransaction({
    chainId: 42161,
    hash: sushiClaimData?.hash,

    onSuccess: notify1,
    onError: notify3,
  });

  const SushiPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [1, address],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const SushiTVLRead = useContractRead({
    address: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const SushiUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [1, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const SushiAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [1],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ETHPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [0, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHTVLRead = useContractRead({
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [0, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("SuccessFUll checccck", data[0].toString());
    },
  });

  const EthAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [0],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ARBPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [2, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ARBTVLRead = useContractRead({
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ARBUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [2, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ArbAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [2],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ETHLVLPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [6, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHLVLTVLRead = useContractRead({
    address: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ETHLVLUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [6, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const EthLvlAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [6],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const USDCPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [3, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDCTVLRead = useContractRead({
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDCUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [3, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDCAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [3],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDTPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [4, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDTTVLRead = useContractRead({
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const USDTUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [4, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DAIPendingRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "pending",
    chainId: 42161,
    args: [5, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DAITVLRead = useContractRead({
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args: [genesisAddress],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DAIUserRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "userInfo",
    chainId: 42161,
    args: [5, address || "0x000000000000000000000000000000000000dead"],

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const DaiAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "poolInfo",
    chainId: 42161,
    args: [5],

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const levelPriceRead = useContractRead({
    address: "0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D",
    abi: BoardRoomABI,
    functionName: "getNativePrice",
    chainId: 42161,

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
  const arbPriceRead = useContractRead({
    address: "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const sushiPriceRead = useContractRead({
    address: "0xb2a8ba74cbca38508ba1632761b56c897060147c",
    abi: ChainlinkFEEDABI,
    functionName: "latestAnswer",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpreservesRead = useContractRead({
    address: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
    abi: SLPABI,
    functionName: "getReserves",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const lpSupplyRead = useContractRead({
    address: "0x623f44f9fae979e1099c6ca6a841a3b0163edc06",
    abi: SLPABI,
    functionName: "totalSupply",
    chainId: 42161,

    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const totalAllocRead = useContractRead({
    address: genesisAddress,
    abi: GenesisABI,
    functionName: "totalAllocPoint",
    chainId: 42161,

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
      const read1 = (SushiPendingRead.data[0] || 0).toString();

      setPendingSushi(ethers.utils.formatEther(read1));
    } catch {}
    try {
      const read2 = (SushiTVLRead.data || 0).toString();
      setSushiTVL(ethers.utils.formatEther(read2));
    } catch {}
    try {
      const read3 = (SushiUserRead.data[0] || 0).toString();
      setUserSushi(ethers.utils.formatEther(read3));
    } catch {}

    try {
      const read4 = (USDCPendingRead.data[0] || 0).toString();
      setPendingUSDC(ethers.utils.formatEther(read4));
    } catch {}
    const read5 = (USDCTVLRead.data || 0).toString();
    try {
      setUsdcTVL(ethers.utils.formatUnits(read5, 6));
    } catch {}
    try {
      const read6 = (USDCUserRead.data[0] || 0).toString();
      setUserUSDC(ethers.utils.formatUnits(read6, 6));
    } catch {}
    try {
      const read7 = (DAIPendingRead.data[0] || 0).toString();

      setPendingDAI(ethers.utils.formatEther(read7));
    } catch {}
    const read8 = (DAITVLRead.data || 0).toString();
    setDaiTVL(ethers.utils.formatEther(read8));
    try {
      const read9 = (DAIUserRead.data[0] || 0).toString();
      setUserDAI(ethers.utils.formatEther(read9));
    } catch {}
    try {
      const read10 = (ARBPendingRead.data[0] || 0).toString();

      setPendingArb(ethers.utils.formatEther(read10));
    } catch {}
    try {
      const read11 = (ARBTVLRead.data || 0).toString();
      setArbTVL(ethers.utils.formatEther(read11));
    } catch {}
    try {
      const read12 = (ARBUserRead.data[0] || 0).toString();
      setUserArb(ethers.utils.formatEther(read12));
    } catch {}
    try {
      const read13 = (ETHPendingRead.data[0] || 0).toString();

      setPendingEth(ethers.utils.formatEther(read13));
    } catch {}

    try {
      const read14 = (ETHTVLRead.data || 0).toString();
      setEthTVL(ethers.utils.formatEther(read14));
    } catch {}

    try {
      const read15 = (ETHUserRead.data[0] || 0).toString();

      setUserEth(ethers.utils.formatEther(read15));
    } catch {}

    try {
      const read16 = (ETHLVLPendingRead.data[0] || 0).toString();
      setPendingETHLEVEL(ethers.utils.formatEther(read16));
    } catch {}
    const read17 = (ETHLVLTVLRead.data || 0).toString();
    try {
      setEthLevelTVL(ethers.utils.formatEther(read17));
    } catch {}

    try {
      const read18 = (ETHLVLUserRead.data[0] || 0).toString();
      setUserETHLEVEL(ethers.utils.formatEther(read18));
    } catch {}

    try {
      const read30 = (USDTTVLRead.data || 0).toString();
      setUsdtTVL(ethers.utils.formatUnits(read30, 6));
    } catch {}
    try {
      const read31 = (USDTUserRead.data[0] || 0).toString();
      setUserUSDT(ethers.utils.formatUnits(read31, 6));
    } catch {}
    try {
      const read32 = (USDTPendingRead.data[0] || 0).toString();
      setPendingUSDT(ethers.utils.formatEther(read32));
    } catch {}
    try {
      const read19 = (levelPriceRead.data || 0).toString();
      setNativePrice(ethers.utils.formatEther(read19));
    } catch {}
    try {
      const read20 = (ethPriceRead.data || 0).toString();
      setEthPrice(ethers.utils.formatUnits(read20, 8));
    } catch {}
    try {
      const read21 = (sushiPriceRead.data || 0).toString();
      setSushiPrice(ethers.utils.formatUnits(read21, 8));
    } catch {}
    try {
      const read22 = (arbPriceRead.data || 0).toString();
      setArbPrice(ethers.utils.formatUnits(read22, 8));
    } catch {}
    try {
      const read23 = lpreservesRead.data[1] || 0;
      const read24 = lpSupplyRead.data;
      setLpSupply(ethers.utils.formatEther(read24.toString()));

      const mul = read23 * 2;
      setLpPrice(ethers.utils.formatEther(mul.toString()));
    } catch {}
    try {
      const allocread0 = (EthAllocRead.data[1] || 0).toString();
      setEthAllocation(allocread0);
    } catch {}
    try {
      const allocread1 = (SushiAllocRead.data[1] || 0).toString();
      setSushiAllocation(allocread1);
    } catch {}
    try {
      const allocread2 = (ArbAllocRead.data[1] || 0).toString();
      setArbAllocation(allocread2);
    } catch {}
    try {
      const allocread3 = (USDCAllocRead.data[1] || 0).toString();
      setUsdcAllocation(allocread3);
    } catch {}
    try {
      const allocread4 = (DaiAllocRead.data[1] || 0).toString();
      setDaiAllocation(allocread4);
    } catch {}
    try {
      const allocread5 = (EthLvlAllocRead.data[1] || 0).toString();
      setEthLevelAllocation(allocread5);
    } catch {}
    try {
      const totallcread0 = (totalAllocRead.data || 0).toString();
      setTotalAllocation(totallcread0);
      setTotal(
        pendingSushi +
          pendingArb +
          pendingDAI +
          pendingETHLEVEL +
          pendingEth +
          pendingUSDC
      );
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
              Farms & Staking
            </div>
            <div className=" flex-auto text-left">LEVEL TO HARVEST: </div>
            <div className=" flex-auto text-left text-xl">
              {parseFloat(
                parseFloat(pendingSushi) +
                  parseFloat(pendingArb) +
                  parseFloat(pendingDAI) +
                  parseFloat(pendingETHLEVEL) +
                  parseFloat(pendingEth) +
                  parseFloat(pendingUSDC)
              ).toLocaleString()}
            </div>
            <div className=" flex-auto  text-left">
              ${" "}
              {parseFloat(
                parseFloat(
                  parseFloat(pendingSushi) +
                    parseFloat(pendingArb) +
                    parseFloat(pendingDAI) +
                    parseFloat(pendingETHLEVEL) +
                    parseFloat(pendingEth) +
                    parseFloat(pendingUSDC)
                ) *
                  (nativePrice * ethPrice)
              ).toLocaleString()}
            </div>
            <div className=" flex-auto font-bold text-xl text-right">
              {" "}
              {parseFloat(
                sushiTVL * sushiPrice +
                  arbTVL * arbPrice +
                  daiTVL +
                  ethLevelTVL * (lpPrice / lpSupply || 1) +
                  ethTVL * ethPrice +
                  usdcTVL
              ).toFixed(2)}{" "}
              $ staked
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
                    className="h-32 -m-8 md:mr-8"
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"
                    }
                  ></img>
                </div>
                <div className="flex-auto px-4  w-2">WETH</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        ((levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          ethallocation) /
                          totalAllocation /
                          ethTVL) *
                        ethPrice
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          ethallocation) /
                        totalAllocation /
                        (ethTVL * ethPrice) /
                        365
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div> <div> ${ethTVL}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>
                    <NumberFormat number={userEth} />
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
                  Level Earned: $ {pendingEth * nativePrice * ethPrice}
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
                    className="h-32 -m-8 md:mr-8 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908734670147644/sSUSHI.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto px-4 w-2">SUSHI</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        parseFloat(
                          levelPerSecond *
                            nativePrice *
                            ethPrice *
                            31556926 *
                            arballocation
                        ) /
                        totalAllocation /
                        (sushiTVL * sushiPrice)
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          arballocation) /
                          totalAllocation /
                          (sushiTVL * sushiPrice) /
                          365 || 0
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    $<NumberFormat number={parseFloat(sushiTVL).toFixed(2)} />
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div> {parseFloat(userSushi).toFixed(4)}</div>
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
                  {parseFloat(
                    pendingSushi * nativePrice * ethPrice
                  ).toLocaleString()}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(sushiClaimWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto "
                >
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
                    className="h-32 -m-8 md:mr-8   "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105909574810222773/sARB.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  px-4 w-2">ARB</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          arballocation) /
                        totalAllocation /
                        (arbTVL * arbPrice)
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          arballocation) /
                        totalAllocation /
                        (arbTVL * arbPrice) /
                        365
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    $
                    <NumberFormat
                      number={parseFloat(arbTVL * arbPrice).toFixed(2)}
                    />
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>{parseFloat(userArb).toFixed(4)}</div>
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
                  {(pendingArb * nativePrice * ethPrice).toLocaleString()}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(claimArbWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black "
                >
                  Claim
                </button>
                <DepositModal index={2} />
                <WithdrawModal index={2} />
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
                    className="h-32 -m-8 md:mr-8  "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908735139917977/sUSDC.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto  px-4 w-2">USDC</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    {" "}
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          arballocation) /
                        totalAllocation /
                        usdcTVL
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={(
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          usdcallocation) /
                        totalAllocation /
                        usdcTVL /
                        365
                      ).toLocaleString()}
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div> <div> ${usdcTVL}</div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div> <div> {userUSDC}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: $ {pendingUSDC * nativePrice}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(claimUsdcWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black "
                >
                  Claim
                </button>
                <DepositModal index={3} />
                <WithdrawModal index={3} />
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
                    className="h-32 -m-8 md:mr-8  "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908735794225262/sUSDT.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto px-4 w-2">USDT</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          daiallocation) /
                        totalAllocation /
                        usdtTVL
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          daiallocation) /
                        totalAllocation /
                        usdtTVL /
                        365
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    $ <NumberFormat number={usdtTVL} />
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div>{" "}
                  <div>
                    {" "}
                    <NumberFormat number={userUSDT} />
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
                  Level Earned: $ {pendingUSDC * nativePrice}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(claimUsdtWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black "
                >
                  Claim
                </button>
                <DepositModal index={4} />
                <WithdrawModal index={4} />
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
                    className="h-32 -m-8 md:mr-8 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908731708977272/sDAI.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto px-4 w-2 ">DAI </div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          arballocation) /
                        totalAllocation /
                        daiTVL
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          daiallocation) /
                        totalAllocation /
                        daiTVL /
                        365
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    $<NumberFormat number={daiTVL} />
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div> <div> {userDAI}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: $ {pendingDAI * nativePrice}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(claimDaiWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black "
                >
                  Claim
                </button>
                <DepositModal index={5} />
                <WithdrawModal index={5} />
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
                <div className="flex-auto flex flex-row">
                  <img
                    className="h-32 -m-8 -md:mr-8 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908732245844109/sETH.gif"
                    }
                  ></img>
                  <img
                    className="h-32 -mt-8 -mb-8  -ml-16 "
                    src={
                      "https://cdn.discordapp.com/attachments/943951700379721740/1105908732669472858/sLEVEL.gif"
                    }
                  ></img>
                </div>
                <div className=" flex-auto px-4  w-2  ">ETH/LEVEL</div>

                <div className="flex-auto flex-col ">
                  {" "}
                  <div>APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          usdcallocation) /
                        totalAllocation /
                        (ethLevelTVL * lpPrice)
                      }
                    />
                    %
                  </div>
                </div>
                <div className="flex-auto hidden sm:block flex-col ">
                  {" "}
                  <div>daily APR</div>
                  <div>
                    <NumberFormat
                      number={
                        (levelPerSecond *
                          nativePrice *
                          ethPrice *
                          31556926 *
                          usdcallocation) /
                        totalAllocation /
                        (ethLevelTVL * lpPrice) /
                        365
                      }
                    />
                    %
                  </div>
                </div>

                <div className="flex-auto flex-col">
                  <div> TVL</div>{" "}
                  <div>
                    {" "}
                    $ <NumberFormat number={ethLevelTVL} />
                  </div>
                </div>
                <div className="flex-auto flex-col">
                  <div>Deposited</div> <div> {userETHLEVEL}</div>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
                <div className="flex-auto">
                  Level Earned: $ {pendingETHLEVEL * nativePrice}
                </div>{" "}
                <button
                  onClick={() =>
                    toast.promise(claimLevelWriteAsync?.(), {
                      loading: "Claiming...",
                      success: <b>Settings saved!</b>,
                      error: <b>Could not claim.</b>,
                      idle: <div>boring</div>,
                    })
                  }
                  className="bg-black mx-2 rounded-lg py-2 text-white flex-auto hover:scale-110 hover:bg-white  hover:border-black transition duration-300 ease-in-out hover:text-black "
                >
                  Claim
                </button>
                <DepositModal index={6} />
                <WithdrawModal index={6} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
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
