import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon,ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { usePrepareContractWrite,useContractWrite,useContractRead,useAccount,useWaitForTransaction } from 'wagmi'
import { watchBlockNumber } from "@wagmi/core";
import BUSDABI from "@/constants/BUSDABI.json"
import DuesPresaleABI from "@/constants/DuesPresaleABI.json"
import contractAddresses from "@/constants/contractAddresses.json"
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import BoardRoomABI from "@/constants/BoardRoomABI.json"


const BUSDaddress =
    56 in contractAddresses ? contractAddresses[56][1] : null;

  const USDCaddress =
    56 in contractAddresses ? contractAddresses[56][2] : null;
  const USDTaddress =
    56 in contractAddresses ? contractAddresses[56][3] : null;

  const DAIaddress =
    56 in contractAddresses ? contractAddresses[56][4] : null;
const tokens = [
  { id: 1, name: "LODGE", address: "0xFC40f09F5B347afCEaA6C3648B81C2E2761E6d85" },
    { id: 2, name: "USDC",  address: "0x068Ad5F1F7c05F086C336b09726C8207eA713022" },
    { id: 3, name: "USDT",  address: USDTaddress },
    { id: 4, name: "DAI",  address: DAIaddress },
];

export default function MasonryDepositModal( ) {
  const [open, setOpen] = useState(false)
  let [ValueOrder, setValueOrder] = useState(0);
 
  let [balance,setBalance]=useState(0);
  let [allowance,setAllowance]=useState(0);
  
  function handleOpen(){
    setOpen(true);
  }
  

  const cancelButtonRef = useRef(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  
  const notify2=() => toast( <div> Transaction sent! {" "}</div>)
  const notify5=() => toast( <div> Transaction sent! {" "}</div>)
  const notify3=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">arbiscan</a></div>)
  const notify6=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://arbiscan.com/tx/${approveData?.hash}`} className="underline">arbiscan</a></div>)
  const notify1 = () => toast.success(<div>{`Succesfully purchased ${Math.round(ValueOrder*100 / 333)/100} DUES!  `} <a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">arbiscan</a></div>)
  const notify4 = () => toast.success(<div>{`Succesfully approved ${tokens[0].name} !  `} <a href={`https://arbiscan.com/tx/${approveData?.hash}`} className="underline">arbiscan</a></div>)
  const { config, error,refetch } = usePrepareContractWrite({
    address: '0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D',
    abi: BoardRoomABI,
    functionName: 'stake',
    chainId: 42161,
    args: [ethers.utils.parseEther(ValueOrder.toString()|| "1")],
  })
  const { write,isSuccess,data,isLoading,reset } = useContractWrite({...config
  ,onSuccess:notify2})
  
  const { isSuccess:finished } = useWaitForTransaction({
    chainId: 42161,
    hash: data?.hash,onSuccess:notify1,onError:notify3,
  })


  const { config:approveConfig, error:approveError } = usePrepareContractWrite({
    address: "0xA8d9d5E9eAE0b44EDc30B5d302f018F252d9CEB7",
    abi: BUSDABI,
    functionName: 'approve',
    chainId: 42161,
    args: ['0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D','1000000000000000000000000'],
    
  })
  const { write:approveWrite,isSuccess:approveSuccess,data:approveData,isLoading:approveLoading } = useContractWrite({...approveConfig
  ,onSuccess:notify5})
  
  const { isSuccess:finished1 } = useWaitForTransaction({
    chainId: 42161,
    hash: approveData?.hash,onSuccess: handleApprovaleSuccess,onError:notify6,
  })
  async function handleApprovaleSuccess(){

    await refetch();
    
    notify4?.()
    write?.()
   
  }

  const ContractRead = useContractRead({
    address: "0xA8d9d5E9eAE0b44EDc30B5d302f018F252d9CEB7",
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: 42161,
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead1 = useContractRead({
    address: "0xA8d9d5E9eAE0b44EDc30B5d302f018F252d9CEB7",
    abi: BUSDABI,
    functionName: "allowance",
    args:[address,'0xc99Ceb0F6d6539EF4dbfFF8295F695903A8A835D'],
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
    const rdep = (ContractRead.data||0).toString();
    setBalance(rdep);
    const read1=(ContractRead1.data||0).toString();
    setAllowance(read1);
    
    
    
  }
  function handleDeposit(){
    if(tokens[0].name=="USDC"||tokens[0].name=="USDT"){
    if(ethers.utils.formatUnits(allowance,6)<ValueOrder){
      approveWrite?.()
    }
    else{
    write?.()}}
    else{if(ethers.utils.formatUnits(allowance,"ether")<ValueOrder){
      approveWrite?.()
    }
    else{
    write?.()}}
    
  }
  useEffect(() => {
    updateUI();
  }, [unwatch]);


  return (
    <> {console.log(`HERE ${error}`)}  <button onClick={handleOpen}  className="text-xl m-2 mt-12 rounded-lg p-0.5 px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out">
    ZAP IN
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

        <div className="fixed inset-0 z-10 overflow-y-auto font-Montserrat  ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className='card relative transform overflow-hidden sm:overflow-visible     inline-block animate-border rounded-3xl  bg-gradient-to-r from-black via-gray-500 to-white bg-[length:400%_400%] p-1 shadow-lg transition focus:outline-none focus:ring m'>
                <div className="relative transform overflow-hidden rounded-3xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all  sm:w-full sm:max-w-md sm:p-6"><div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black">
                  <img
                className=""
                src={
                  "https://cdn.discordapp.com/attachments/943951700379721740/1076903599638057001/dues.png"
                }/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                     DEPOSIT
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select any amount of tokens.
                      </p>
                      <div className='flex gap-2'>
                      
      </div>
       <div className='flex gap-2 '> <input
            className="accent-black flex-auto "
            type="range"
            
            w-full="true"
            min="0"
            max={(tokens[0].name === "USDT"|| tokens[0].name === "USDC")?(ethers.utils.formatUnits(balance,6)):(ethers.utils.formatUnits(balance, "ether")) }
            step="0.01"
            value={ValueOrder}
            onChange={(event) => {
              setValueOrder(event.target.value);
            }} 
            list="tickmarks1"
          /><input className="flex-auto rounded-lg my-1 border-2"
          type="number" // change the type to "number"
          style={{ maxWidth : "35%",borderColor :"#000",cursor:"zoom-in" }}
          value={ValueOrder}
          step="0.01" // bind the value of the input field to the same value as the slider
          max={(tokens[0].name === "USDT"|| tokens[0].name === "USDC")?(ethers.utils.formatUnits(balance,6)):(ethers.utils.formatUnits(balance, "ether")) }
          onChange={(event) => {
            setValueOrder(event.target.value); // update the value of the slider when the input field value changes
          }}
        /></div>
        <div className='text-base text-black'>Available { (tokens[0].name === "USDT"|| tokens[0].name === "USDC")? (Math.round(100*ethers.utils.formatUnits(balance, 6) 
            )/100).toLocaleString() :(Math.round(100*ethers.utils.formatUnits(balance, 18) 
            )/100).toLocaleString()} {tokens[0].name}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md  bg-gradient-to-b from-black via-gray-800 to-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-white hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm hover:scale-110 hover:text-black transition duration-300 ease-in-out"
                    onClick={() => handleDeposit?.()  }
                  >{isLoading &&`Waiting for approval` }
                   {isLoading||approveLoading &&`Waiting for approval` }
                   {isSuccess &&!finished &&`Buying $ ${ValueOrder} DUES`}
                   {!isSuccess && !isLoading && !finished && !approveLoading&&`Deposit $ ${ValueOrder} LODGE` }
                   {isSuccess  && finished &&`Deposit $ ${ValueOrder} LODGE` }
                   
                   
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Toaster />
        </div>
      </Dialog>
    </Transition.Root></>
  )
}
