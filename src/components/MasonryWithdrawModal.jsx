import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { usePrepareContractWrite,useContractWrite,useContractRead,useAccount,useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { BoardRoomABI, ContractAddressList } from '@/constants';
import useRefreshHook from '@/hook/refresh';

const {
  chainId: arbChainId,
  boardRoomAddress
} = ContractAddressList;

const WithdrawButton = ({valueOrder, updateUI}) => {
  const notify2=() => toast( <div> Transaction sent! {" "}</div>)
  const notify3=() => toast.error( <div> <div>Something went horrible !</div><a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">arbiscan</a></div>)
  const notify1 = () => toast.success(<div>{`Succesfully purchased ${Math.round(valueOrder*100 / 333)/100} DUES!  `} <a href={`https://arbiscan.com/tx/${data?.hash}`} className="underline">arbiscan</a></div>)
  
  const { config, refetch } = usePrepareContractWrite({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: 'withdraw',
    args:[ethers.utils.parseEther(valueOrder.toString()|| "1")],
    chainId: arbChainId,
    args: [ethers.utils.parseEther(valueOrder.toString()|| "1")],
  })

  const { write, data: withdrawData, isLoading } = useContractWrite({
    ...config,
    onSuccess:notify2
  })

  useWaitForTransaction({
    chainId: arbChainId,
    hash: withdrawData?.hash,
    onSuccess: () => {
      notify1();
      updateUI();
      refetch();
      // forceRefresh();
    },
    onError: notify3
  })

  function handleWithdraw(){
    write?.()
  }
  
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex w-full justify-center rounded-md  bg-gradient-to-b from-black via-gray-800 to-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-white hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm hover:scale-110 hover:text-black transition duration-300 ease-in-out`}
      onClick={() => handleWithdraw?.()  }
    >
      { isLoading ? `Withdrawing $ ${valueOrder} LODGE` :
        `Withdraw $  ${valueOrder} LODGE` }
    </button>
  )
}

export default function MasonryWithdrawModal(props) {
  const { refreshCount } = useRefreshHook(120000);

  const [open, setOpen] = useState(false)
  const [ValueOrder, setValueOrder] = useState(0);
  const [balance,setBalance]=useState(0);
  
  function handleOpen(){
    setOpen(true);
  }

  const cancelButtonRef = useRef(null)
  const { address, isConnecting, isDisconnected } = useAccount()

  const {refetch: BalanceRefresh} = useContractRead({
    address: boardRoomAddress,
    abi: BoardRoomABI,
    functionName: "balanceOf",
    chainId: arbChainId,
    args:[address],
    // watch: true,
    onSuccess(data) {
      const rdep = (data[0]||0).toString();
      setBalance(rdep);
    },
  });
  

  async function updateUI() {
    BalanceRefresh();
  }

  useEffect(() => {
    updateUI();
  }, [refreshCount]);


  return (
    <><button 
      disabled={balance <= 0} 
      onClick={handleOpen} 
      className={`${balance<=0?"cursor-not-allowed":"cursor-pointer"} text-xl m-2 flex-auto rounded-lg p-0.5 px-2 bg-black hover:scale-110 text-white border-2 border-white  hover:bg-white hover:text-black hover:border-2 hover:border-black  transition duration-300 ease-in-out`}
    >
      Withdraw
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
                  <img className="" src={
                    "https://cdn.discordapp.com/attachments/943951700379721740/1076903599638057001/dues.png"
                  }/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                      WITHDRAW
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select any amount of tokens.
                      </p>
                      <div className='flex gap-2'></div>
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
                          style={{ maxWidth : "35%",borderColor :"#000" }}
                          value={ValueOrder}
                          step="0.01" // bind the value of the input field to the same value as the slider
                          max={ethers.utils.formatUnits(balance, "ether")}
                          onChange={(event) => {
                            setValueOrder(event.target.value); // update the value of the slider when the input field value changes
                          }}
                        />
                      </div>
                      <div className='text-base text-black'>\
                        {`Available `}
                        { (Math.round(100*ethers.utils.formatUnits(balance, "ether"))/100).toLocaleString()} 
                        { ` LODGE` }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <WithdrawButton updateUI={updateUI} valueOrder={ValueOrder} />
                  
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
