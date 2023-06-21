import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { usePrepareContractWrite,useContractWrite,useContractRead,useAccount,useWaitForTransaction } from 'wagmi'
// import { watchBlockNumber } from "@wagmi/core";
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { ContractAddressList, DeadAddress, BoardRoomABI, BUSDABI } from '@/constants';
import useRefreshHook from '@/hook/refresh';

const {
  chainId: arbChainId,
  lodgeTokenAddress,
  boardRoomAddress
} = ContractAddressList;


const DepositButton = ({valueOrder, forceRefresh}) => {
  const notify2=() => toast( <div> Transaction sent! {" "}</div>)

  // Deposit
  const { config } = usePrepareContractWrite({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: 'stake',
    chainId: arbChainId,
    args: [ethers.utils.parseEther(valueOrder.toString() || "1")],
  })

  const { 
    write,
    writeAsync,
    data: depositData,
    isLoading: depositLoading
  } = useContractWrite({
    ...config,
    onSuccess: notify2
  })

  const notify3=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://arbiscan.com/tx/${depositData?.hash}`} className="underline">arbiscan</a></div>)
  const notify1 = () => toast.success(
    <div>
      {`Succesfully purchased ${Math.round(valueOrder*100 / 333)/100} DUES!  `} 
      <a href={`https://arbiscan.com/tx/${depositData?.hash}`} className="underline">arbiscan</a>
    </div>
  )

  useWaitForTransaction({
    chainId: arbChainId,
    hash: depositData?.hash,
    onSuccess: async () => {
      await depositData.wait();
      notify1();
      // Refresh data
      forceRefresh();
    },
    onError: notify3,
  })

  return (
    <button
      type="button"
      className=" inline-flex w-full justify-center rounded-md  bg-gradient-to-b from-black via-gray-800 to-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-white hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm hover:scale-110 hover:text-black transition duration-300 ease-in-out"
      onClick={() => writeAsync?.()  }
    >
      { 
        depositLoading ? `Buying $ ${valueOrder} DUES` :
        `Deposit ${valueOrder} LODGE` 
      }
    </button>
  )
}

export default function MasonryDepositModal( ) {
  const { refreshCount } = useRefreshHook(120000);

  const [open, setOpen] = useState(false)

  const [ValueOrder, setValueOrder] = useState(0);
  const [balance,setBalance]=useState(0);
  const [allowance,setAllowance]=useState(0);
  
  function handleOpen(){
    setOpen(true);
  }
  const cancelButtonRef = useRef(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  
  const notify5=() => toast( <div> Transaction sent! {" "}</div>)
  const notify6=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://arbiscan.com/tx/${approveData?.hash}`} className="underline">arbiscan</a></div>)
  const notify4 = () => toast.success(<div>{`Succesfully approved LODGE! `} <a href={`https://arbiscan.com/tx/${approveData?.hash}`} className="underline">arbiscan</a></div>)

  // Approve
  const { config:approveConfig } = usePrepareContractWrite({
    address: lodgeTokenAddress,
    abi: BUSDABI,
    functionName: 'approve',
    chainId: arbChainId,
    args: [boardRoomAddress, ethers.utils.parseEther(ValueOrder.toString() || '0')],
  })

  const { write:approveWrite, data:approveData, isLoading:approveLoading } = useContractWrite({
    ...approveConfig,
    onSuccess:notify5
  })

  useWaitForTransaction({
    chainId: arbChainId,
    hash: approveData?.hash,
    onSuccess: handleApprovaleSuccess,
    onError:notify6,
  })

  async function handleApprovaleSuccess(){
    updateUI();
    notify4?.()
  }
  
  // Balance Read
  const { refetch: balanceReadRefetch } = useContractRead({
    address: lodgeTokenAddress,
    abi: BUSDABI,
    functionName: "balanceOf",
    chainId: arbChainId,
    args:[address || DeadAddress],
    
    onSuccess(data) {
      const rdep = (data||0).toString();
      if (balance !== rdep) {
        setBalance(rdep);
      }
    },
  });
  
  const { refetch: allowanceReadRefetch } = useContractRead({
    address: lodgeTokenAddress,
    abi: BUSDABI,
    functionName: "allowance",
    args:[address,boardRoomAddress],
    // watch: true,
    onSuccess(data) {
      const read1=(data||0).toString();
      if (allowance !== read1) {
        setAllowance(read1);
      }
    },
  });

  async function updateUI() {
    allowanceReadRefetch();
    balanceReadRefetch();
  }

  useEffect(() => {
    updateUI();
  }, [refreshCount]); // unwatch


  function approveHandle(){
    approveWrite?.()
  }

  return (
    <> <button onClick={handleOpen}  className="text-xl m-2 mt-12 rounded-lg p-0.5 px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out">
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
                      DEPOSIT LODGE
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select any amount of tokens.
                      </p>
                      <div className='flex gap-2'>
                      </div>
                      <div className='flex gap-2 '> 
                          <input
                            className="accent-black flex-auto "
                            type="range"
                            w-full="true"
                            min="0"
                            max={ethers.utils.formatUnits(balance, "ether")}
                            step="0.01"
                            value={ValueOrder}
                            onChange={(event) => {
                              setValueOrder(event.target.value);
                            }} 
                            list="tickmarks1"
                          />
                          <input className="flex-auto rounded-lg my-1 border-2"
                            type="number" // change the type to "number"
                            style={{ maxWidth : "35%",borderColor :"#000"}}
                            value={ValueOrder}
                            step="0.01" // bind the value of the input field to the same value as the slider
                            max={ethers.utils.formatUnits(balance, "ether")}
                            onChange={(event) => {
                              setValueOrder(event.target.value); // update the value of the slider when the input field value changes
                            }}
                          />
                        </div>
                        <div className='text-base text-black'>
                          {`Available `} 
                          { (Math.round(100*ethers.utils.formatUnits(balance, 18))/100).toLocaleString()} 
                          {` LODGE`}
                        </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {
                    (ValueOrder <= 0 || ethers.utils.formatUnits(allowance,tokens[props.index].decimal) < ValueOrder)?
                    <button
                      type="button"
                      disabled={ValueOrder <= 0}
                      className={`${ValueOrder <=0? "cursor-not-allowed": "cursor-pointer"} inline-flex w-full justify-center rounded-md  bg-gradient-to-b from-black via-gray-800 to-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-white hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm hover:scale-110 hover:text-black transition duration-300 ease-in-out`}
                      onClick={() => approveHandle?.()  }
                    >
                      { 
                        approveLoading ? `Waiting for approval` :
                        `Approve ${ValueOrder} LODGE` 
                      }
                    </button>
                    : <DepositButton valueOrder={ValueOrder} tokenIndex={props.index} forceRefresh={props.forceRefresh} />
                  }
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
