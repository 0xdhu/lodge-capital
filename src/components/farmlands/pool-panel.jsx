import { Disclosure } from "@headlessui/react";
import NumberFormat from "@/components/NumFormater.jsx";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import DepositModal from "@/components/FarmsDepositModal";
import WithdrawModal from "@/components/FarmsWithdrawModal";
import { toast } from "react-hot-toast";

const PoolDisclosurePanel = ({
    gifIcon,  // sSUSHI.gif
    lpgifIcon,
    tokenName, // SUSHI
    tokenTVL,
    apr,
    userToken,
    lodgeEarned,
    tokenIndex,
    claimWriteAsync,
    refreshUI
}) => {
    const dailyAPR = apr / 365;
  
    const LpGifComponent = () => {
      return (
        <div className="flex-auto flex flex-row">
          <img
            className="h-32 -m-8 -md:mr-8 "
            src={ gifIcon }
            alt="Lodge Capital"
          ></img>
          <img
            className="h-32 -mt-8 -mb-8  -ml-16 "
            src={ lpgifIcon }
            alt="Lodge Capital"
          ></img>
        </div>
      )
    }
  
    const NormalGifComponent = () => {
      return (
        <div className="flex-auto flex-col">
          <img
            className="h-32 -m-8 md:mr-8 "
            src={ gifIcon }
          ></img>
        </div>
      )
    }
  
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "rounded-b-none " : ""
              } flex w-full mx-auto justify-between max-w-7xl mt-4 items-center rounded-lg bg-white  px-4 py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
            >
              { lpgifIcon && lpgifIcon !== "" ? <LpGifComponent /> : <NormalGifComponent />}
              <div className=" flex-auto px-4 w-2">{ tokenName }</div>
  
              <div className="flex-auto flex-col ">
                {" "}
                <div>APR</div>
                <div>
                  <NumberFormat
                    number={ apr }
                  />
                  %
                </div>
              </div>
              <div className="flex-auto hidden sm:block flex-col ">
                {" "}
                <div>daily APR</div>
                <div>
                  <NumberFormat
                    number={ dailyAPR }
                  />
                  %
                </div>
              </div>
              <div className="flex-auto flex-col">
                <div> TVL</div>{" "}
                <div>
                  {" "}
                  $<NumberFormat number={parseFloat(tokenTVL).toFixed(3)} />
                </div>
              </div>
              <div className="flex-auto flex-col">
                <div>Deposited</div>{" "}
                <div> {parseFloat(userToken).toFixed(4)}</div>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-black`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 flex mx-auto items-center bg-white max-w-7xl pb-2 text-sm text-black rounded-b-lg">
              <div className="flex-auto">
                LODGE Earned: ${" "}
                {lodgeEarned}
              </div>{" "}
              <button
                disabled={ parseFloat(lodgeEarned) <= 0}
                onClick={() =>
                  toast.promise(claimWriteAsync?.(), {
                    loading: "Claiming...",
                    success: <b>Settings saved!</b>,
                    error: <b>Could not claim.</b>,
                    idle: <div>boring</div>,
                  })
                }
                className={`bg-black mx-2 rounded-lg py-2 text-white flex-auto ${parseFloat(lodgeEarned) <= 0? "cursor-not-allowed": "cursor-pointer" }`}
              >
                Claim
              </button>
              <DepositModal index={tokenIndex} forceRefresh={
                () => {
                  refreshUI();
                }
              } />
              <WithdrawModal index={tokenIndex} forceRefresh={
                () => {
                  refreshUI();
                }
              } />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}

export default PoolDisclosurePanel;