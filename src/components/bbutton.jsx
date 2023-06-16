import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid'
import { MinusIcon as MinusIconOutline } from '@heroicons/react/24/outline'


import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline'

import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon,ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { usePrepareContractWrite,useContractWrite,useContractRead,useAccount,useWaitForTransaction } from 'wagmi'
import { watchBlockNumber } from "@wagmi/core";
import BUSDABI from "@/constants/BUSDABI.json"
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
export default function ExampleB(props) {
  const [open, setOpen] = useState(false)
  let [ValueOrder, setValueOrder] = useState(0);
  let [selectedToken,setSelectedToken]=useState(tokens[0]);
  let [balance,setBalance]=useState(0);
  let [allowance,setAllowance]=useState(0);
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
  const { config, error } = usePrepareContractWrite({
    address: '0xeBc41E388b32F3476FA7C5f89E148Dee9910066e',
    abi: WildCardABI,
    functionName: 'bulkMintNFT',
    args: [ValueOrder,selectedToken.address],
  })
  const { write,isSuccess,data,isLoading } = useContractWrite({...config
  ,onSuccess:notify2})
  
  const { isSuccess:finished } = useWaitForTransaction({
    hash: data?.hash,onSuccess:notify1,onError:notify3,
  })


  const { config:approveConfig, error:approveError } = usePrepareContractWrite({
    address: selectedToken.address,
    abi: BUSDABI,
    functionName: 'approve',
    args: ['0xeBc41E388b32F3476FA7C5f89E148Dee9910066e','1000000000000000000000000'],
  })
  const { write:approveWrite,isSuccess:approveSuccess,data:approveData,isLoading:approveLoading } = useContractWrite({...approveConfig
  ,onSuccess:notify5})
  
  const { isSuccess:finished1 } = useWaitForTransaction({
    hash: approveData?.hash,onSuccess: handleApprovaleSuccess,onError:notify6,
  })
  function handleApprovaleSuccess(){
   
    notify4?.()
    write?.()
  }

  const ContractRead = useContractRead({
    address: selectedToken.address,
    abi: BUSDABI,
    functionName: "balanceOf",
    args:[address],
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ContractRead1 = useContractRead({
    address: selectedToken.address,
    abi: BUSDABI,
    functionName: "allowance",
    args:[address,'0xeBc41E388b32F3476FA7C5f89E148Dee9910066e'],
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
    setAllowance(read1);
   
    
  }
  function handleDeposit(){
    if(ethers.utils.formatUnits(allowance,"ether")<ValueOrder){
      approveWrite?.()
    }
    else{
    write?.()}
  }
  useEffect(() => {
    updateUI();
  }, [unwatch]);


  return (
    <> {console.log(config)}{console.log(error)}<button
    type="button"
    onClick={handleOpen}
    className="inline-flex items-center rounded-full mx-2 border-white border-2 bg-red-600 p-2 text-white shadow-sm hover:bg-red-700 hover:scale-110 transition duration-300 ease-in-out "
  >
        <MinusIconOutline className="h-6 w-6" aria-hidden="true" />
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
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
              <Dialog.Panel className='card relative transform overflow-hidden sm:overflow-visible     inline-block animate-border rounded-3xl  bg-gradient-to-r from-teal-500 via-blue-500 to-purple-900 bg-[length:400%_400%] p-1 shadow-lg transition focus:outline-none focus:ring m'>
                <div className="relative transform overflow-hidden rounded-3xl bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all  sm:w-full sm:max-w-md sm:p-6"><div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black">
                  <img
                className="bg-black text-black rounded-full"
                src={
                  "https://img.freepik.com/premium-photo/masonic-freemasonry-square-compass-with-g-letter-emblem-icon-logo-symbol-clay-style-white-background-3d-rendering_476612-15460.jpg?w=100"
                }/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                     {props.tier}
                    </Dialog.Title>
                    <div className="mt-2">
                      
                      <div className='flex gap-2'>
                     
      </div>
      <div className='text-lg text-white'> Withdraw {props.name} tokens </div>
      <div className='text-base text-gray-200'>Available { (Math.round(100*ethers.utils.formatUnits(balance, "ether") 
            )/100).toLocaleString() } {props.name}</div> <div className='flex gap-2 '></div>

<div className='flex gap-2 '> <input
            className="bg-red-500 text-red-400 flex-auto "
            type="range"
            
            w-full="true"
            min="0"
            max={ethers.utils.formatUnits(balance, "ether")/33 }
            step="1"
            value={ValueOrder}
            onChange={(event) => {
              setValueOrder(event.target.value);
            }} 
            list="tickmarks1"
          /><input className="flex-auto rounded-lg my-1"
          type="number" // change the type to "number"
          style={{ maxWidth : "35%",borderColor :"#fff",cursor:"zoom-in" }}
          value={ValueOrder} // bind the value of the input field to the same value as the slider
          max={ethers.utils.formatUnits(balance, "ether")/33 }
          onChange={(event) => {
            setValueOrder(event.target.value); // update the value of the slider when the input field value changes
          }}
        /></div>
       
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md border border-transparent bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-gray-900 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    disabled={!write} onClick={() => handleDeposit?.()  }
                  >Withdraw {`(${props.price}) `} tokens
                   
                   
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button></div>
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
