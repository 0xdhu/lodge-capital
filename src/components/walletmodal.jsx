import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon,ArrowTopRightOnSquareIcon,WalletIcon } from '@heroicons/react/24/outline'
import { usePrepareContractWrite,useContractWrite,useContractRead,useAccount,useWaitForTransaction } from 'wagmi'
import { watchBlockNumber } from "@wagmi/core";
import LevelPresaleABI from "@/constants/LevelPresaleABI.json"
import  DuesPresaleABI  from '@/constants/DuesPresaleABI';
import WildCardABI from "@/constants/WildCardABI.json"
import contractAddresses from "@/constants/contractAddresses.json"
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';


const BUSDaddress =
    56 in contractAddresses ? contractAddresses[56][1] : null;

  const USDCaddress =
    56 in contractAddresses ? contractAddresses[56][2] : null;
  const USDTaddress =
    56 in contractAddresses ? contractAddresses[56][3] : null;

  const DAIaddress =
    56 in contractAddresses ? contractAddresses[56][4] : null;
const tokens = [
  { id: 1, name: "BUSD", address: BUSDaddress },
    { id: 2, name: "USDC",  address: USDCaddress },
    { id: 3, name: "USDT",  address: USDTaddress },
    { id: 4, name: "DAI",  address: DAIaddress },
];
const oldDUES= new Map([["0xb234182bd57526686cd6db545c34daa04942daa8",113.9546867],["0x3a90a87690988fb1aff0db9221383870f3a2d7c0",89.395433127944907575],["0xf7fc09f24a5f7e9a0fa36d99dd8dc877c3e0fed6",49.353406317032895861],["0x1b184a64cb8a2efb161c9dcdd4565413bfeec81d",38.093133520550396763],["0xba9f68316932ae306806df192455e011af78ea1a",35.39804325956928934],["0x979edfe09015880e7c14a173d39785eaa1e2b721",31.081067284076657563],["0xb56aeabd6531b8dac8754ad41223768eda2a04d7",103.9101762909545],["0x825b132e230c021644a636dc093f74a26891b9c2",19.511903327637369491],["0xc911faaa3e4755a5aa451f394295062e0ae623d1",12.61845759884379719],["0xafc44e82c1a77859503913835969560cb772051a",12.01081081081081081],["0x8939dbbdcbad2e75435e8e98c5d0bc73898b3bc1",10.363427189788982535],["0x6ab2fdb75ae385f4178f693e670e61d271084443",10.053759005829865627],["0x65cc0a1a964a60b26f402b737762f41424bb2c0e",9.383135955253964712],["0x094d865f52bcb27a80dd67e1ad8ffe9bc2e87d05",8.004803362353647553],["0x1a61bf28f66451bd43e7be5fb788a2b1f5f4231f",7.755248284343015956],["0x31e48a07f143257212de90cd18dd1cbe08bd56bd",6.402737426342158796],["0xe06500f6b2c463cb0fc384251ecc3e49001c696d",3.20069910110029055],["0xfef00efb9a6f95875d0ee4a08b289d537a998c6a",1.601528775783031239],["0xc5d592f1c3625a0aba452c95b06a122ee79b6d50",1.20010802052389954],["0xbf309bf273459510943788a1965b5814d4bd89cc",1.137954232910045332],["0x30fbd666c34d18a68f5784204b220f8f256050b5",1.040081134441930663],["0x12b7498e8eb50b5f2c70050d052c613c6840e73c",1.040081134441930663],["0xe793c78891c3f4fa2a62eefb48d5384b78752457",0.731979621356296434],["0xff82872e554d5d306ff1021ee8b9fb62ce23bce0",0.021344417313810674],["0x40ac3afe94bd2be380978fab3a4692f2afe39eaa",0.007607742263267597],["0xc4022f2bad4527ec76bd2418b83116c3d0f9bef4",20.0000],["0x0a5c6eae411196369755c6b44bbcb3418d1035a7",2],["0xD3F9Fdc072E169F09A49132963E45d8De055815D",4],["0xe4ab985e3ccb5528343086b478fe4d67853d81c4",57.65044895503087]]);
export default function WalletModal() {
  const [open, setOpen] = useState(false)
  let [ValueOrder, setValueOrder] = useState(0);
  let [selectedToken,setSelectedToken]=useState(tokens[0]);
  let [balance,setBalance]=useState(0);
  let [wildcardCount,setWildcardCount]=useState(0);
  let[duesCount,setDuesCount]=useState(0);
  let[duesCountV,setDuesCountV]=useState(0);
  let[levelCount,setLevelCount]=useState(0);
  let[duesCountV2,setDuesCountV2]=useState(0);
  let[theyaddress,setTheyaddress]=useState("");
  function handleOpen(){
    setOpen(true);
  }
  function handleClick(){
    setSelectedToken(tokens[0])
  }
  function handleClick1(){
    setSelectedToken(tokens[1])
  }
  function handleClick2(){
    setSelectedToken(tokens[2])
  }
  function handleClick3(){
    setSelectedToken(tokens[3])
  }

  const cancelButtonRef = useRef(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  
  const notify2=() => toast( <div> Transaction sent! {" "}</div>)
  const notify5=() => toast( <div> Transaction sent! {" "}</div>)
  const notify3=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://bscscan.com/tx/${data?.hash}`} className="underline">bscscan</a></div>)
  const notify6=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://bscscan.com/tx/${approveData?.hash}`} className="underline">bscscan</a></div>)
  const notify1 = () => toast.success(<div>{`Succesfully purchased ${Math.round(ValueOrder*100 / 0.33)/100} LEVEL!  `} <a href={`https://bscscan.com/tx/${data?.hash}`} className="underline">bscscan</a></div>)
  const notify4 = () => toast.success(<div>{`Succesfully approved ${selectedToken.name} !  `} <a href={`https://bscscan.com/tx/${approveData?.hash}`} className="underline">bscscan</a></div>)
  

  const ContractRead = useContractRead({
    address: "0xa329C57abA07927b9D2AF9c758A6ceD39336565F",
    abi: LevelPresaleABI,
    functionName: "getLevelOwned",
    chainId: 56,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead1 = useContractRead({
    address: "0x669d3E69E5b100f137604675887f6e3e0cf588D3",
    abi: DuesPresaleABI,
    functionName: "duesOwned",
    chainId: 56,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead2 = useContractRead({
    address: "0x669d3E69E5b100f137604675887f6e3e0cf588D3",
    abi: DuesPresaleABI,
    functionName: "duesOwnedV",
    chainId: 56,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead3 = useContractRead({
    address: "0xcC690cb346aE3CA543931dfbB0D00Cfe47F96aae",
    abi: WildCardABI,
    functionName: "balanceOf",
    chainId: 42161,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead4 = useContractRead({
    address: "0xc232db797D048B9e3e28B71F78d996E04B5aC2a9",
    abi: LevelPresaleABI,
    functionName: "getLevelOwned",
    chainId: 42161,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const ContractRead5 = useContractRead({
    address: "0x15b13C33112ea6Bffef1b77Bc0985e718A85c5Ea",
    abi: DuesPresaleABI,
    functionName: "duesOwnedV",
    chainId: 42161,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  
  const unwatch = watchBlockNumber(
    {
      chainId: 56,
    },
    (blockNumber) => console.log(blockNumber)
  );

  async function updateUI() {
    const rdep = (ContractRead.data||0).toString();
    setBalance(rdep);
    const read1=(ContractRead1.data||0).toString();
    setDuesCount(read1);
    const read2=(ContractRead2.data||0).toString();
    setDuesCountV(read2);
    const read3=(ContractRead3.data||0).toString();
    setWildcardCount(read3);
    const rdep4 = (ContractRead4.data||0).toString();
    setLevelCount(rdep4);
    const read5=(ContractRead5.data||0).toString();
    setDuesCountV2(read5);
    if(address!=null){
    setTheyaddress(address);}
   
    
  }
 
  useEffect(() => {
    updateUI();
  }, [unwatch]);


  return (
    <>  <button
    type="button"
    onClick={handleOpen}
    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <WalletIcon className="h-6 w-6 hover:animate-spin-reverse-slower" aria-hidden="true" />
                </button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto font-Montserrat   ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-88 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-88 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            > 
              <Dialog.Panel  className='card inline-block animate-border rounded-3xl bg-white bg-gradient-to-r from-black via-gray-500 to-white bg-[length:400%_400%] p-1 shadow-lg transition focus:outline-none focus:ring'>
              <div className="text-white relative transform overflow-hidden rounded-3xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all  sm:w-full sm:max-w-md sm:p-6 h-full -mb-6
              ">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black ">
                  <WalletIcon/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                     WALLET
                    </Dialog.Title>
                    <div className="mt-2">
                    <div className='text-base text-black'>
                     {(oldDUES.has(theyaddress.toLowerCase()) )? (`You have purchased ${oldDUES.get(theyaddress.toLowerCase())} from the seed round`):("")} </div>
                      <p className=" border-blue-800 text-black text-base">You have purchased  {Math.round(ethers.utils.formatUnits(duesCountV, "ether")*1000)/1000 +Math.round(ethers.utils.formatUnits(duesCount, "ether")*1000)/1000 +Math.round(ethers.utils.formatUnits(duesCountV2, "ether")*1000)/1000} DUES with 3 month Vest </p>
                                
                                <p className="text-black  text-base">You have purchased  {Math.round(ethers.utils.formatUnits(balance, "ether")*100)/100 +Math.round(ethers.utils.formatUnits(levelCount, "ether")*100)/100} LEVEL Available at launch </p>
                                <p className="text-black text-base">You have purchased  {wildcardCount} WildCards Available at launch </p>
                                
     
      </div>
       
                    </div>
                  </div>
               
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  

                  
                </div>
              </Dialog.Panel>
              
            </Transition.Child>
          </div>
          <Toaster />
        </div>
      </Dialog>
    </Transition.Root></>
  )
}
