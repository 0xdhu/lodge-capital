import { useEffect, useState, useCallback, useContext } from "react";
// const { default: GenesisContext } = require("@/contexts/GenesisContext");
import {
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useAccount,
    useWaitForTransaction,
} from "wagmi";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { updateFarmLandPoolPendingValueAtIndex, updateFarmLandPoolTVLAtIndex } from "@/store/index";
import { useDispatch } from 'react-redux';

import { ContractAddressList, DeadAddress } from "@/constants/index.js";
import PoolDisclosurePanel from "./pool-panel";
import {
    commonDepositConfig,
    commonPendingReadConfig,
    commonTVLReadConfig,
    commonUserTokenReadConfig,
    commonTokenAllocReadConfig
} from "./config";

const { chainId: arbChainId, lodgePerSecond } = ContractAddressList;

const FarmLandPool = ({
    refresh=0,
    tokenName,
    tokenAddress,
    gifIcon,
    lpGifIcon="",
    nativePrice=0, // Lodge Price in ETH
    ethPrice=0,
    tokenIndex=0,
    tokenDecimal=18,
    totalAllocation=0,
    tokenPrice=0,
}) => {
    // const { updateFarmLandPoolPendingValueAtIndex, updateFarmLandPoolTVLAtIndex } = useContext(GenesisContext);
    const dispatch = useDispatch();

    const { address } = useAccount();

    const [tokenTVL, setTVL] = useState(0);
    const [userToken, setUserToken] = useState("0");
    const [pendingToken, setPendingToken] = useState("0");
    const [tokenAllocation, setTokenAllocation] = useState("0");

    const notify2 = () => toast(<div> Transaction sent! </div>);

    const { config: claimConfig } = usePrepareContractWrite({
        ...commonDepositConfig,
        args: [tokenIndex, 0], // _pid, _amount
    });

    const {
        // write: claimWrite,
        // isSuccess: claimSuccess,
        data: claimData,
        // isLoading: claimLoading,
        writeAsync: claimWriteAsync,
    } = useContractWrite({
        ...claimConfig,
        onSuccess: notify2,
    });

    useWaitForTransaction({
        chainId: arbChainId,
        hash: claimData?.hash,
        onSuccess: (data) => {
            toast.success(
                <div>
                    {`Succesfully claimed ${pendingToken} LODGE!  `}{" "}
                    <a
                        href={`https://arbiscan.io/tx/${claimData?.hash}`}
                        className="underline"
                    >
                        arbiscan
                    </a>
                </div>
            );
            updateUI();
        },
        onError: () => {
            toast.error(
                <div>{`Something went horrible !`}</div>
            );
        },
    });   

    const {refetch: tokenPendingRead} = useContractRead({
        ...commonPendingReadConfig,
        args: [tokenIndex, address || DeadAddress],
        onSuccess: (pendingData) => {
            const read1 = (pendingData || 0).toString();
            const newPendingToken = ethers.utils.formatUnits(read1, tokenDecimal);
            if (pendingToken !== newPendingToken) {
                setPendingToken(newPendingToken);
                dispatch(updateFarmLandPoolPendingValueAtIndex({tokenIndex, pendingAmount: newPendingToken}));
            }
        }
    });
    
    const {refetch: tokenTVLRead} = useContractRead({
        ...commonTVLReadConfig,
        address: tokenAddress,
        onSuccess: (tvlData) => {
            const read1 = (tvlData || 0).toString();
            const newTVL = ethers.utils.formatUnits(read1, tokenDecimal);
            if (tokenTVL !== newTVL) {
                setTVL(parseFloat(newTVL));
            }
        }
    });
    
    const {refetch: tokenUserRead} = useContractRead({
        ...commonUserTokenReadConfig,
        args: [tokenIndex, address || DeadAddress],
        onSuccess: (userTokenData) => {
            const read1 = (userTokenData[0] || 0).toString();
            const newUserToken = ethers.utils.formatUnits(read1, tokenDecimal);
            setUserToken(newUserToken);
        }
    });
    
    const {refetch: tokenAllocRead} = useContractRead({
        ...commonTokenAllocReadConfig,
        args: [tokenIndex],
        onSuccess: (allocData) => {
            const read1 = (allocData[1] || 0).toString();
            if (tokenAllocation !== read1) {
                setTokenAllocation(read1);
            }
        }
    });

    async function updateUI() {
        tokenPendingRead();
        tokenTVLRead();
        tokenUserRead();
        tokenAllocRead();
    }

    useEffect(() => {
        if (refresh > 0) {
            updateUI();
        }
    }, [refresh, tokenPrice]);

    useEffect(() => {
        const pLockedValue = parseFloat(tokenTVL) * tokenPrice;
        dispatch(updateFarmLandPoolTVLAtIndex({tokenIndex, poolTVL: pLockedValue}));
    }, [tokenTVL, tokenPrice])
   
    const PanelRow = useCallback(() => {
        // console.log("OneTime Rendering", tokenName)
        const apr = (totalAllocation <= 0 || tokenTVL <= 0 || tokenPrice <= 0)? 0 : ((lodgePerSecond *
          nativePrice *
          ethPrice *
          31556926 *
          tokenAllocation) / totalAllocation / tokenTVL / tokenPrice);
    
        const lodgeEarned = parseFloat(
          pendingToken * nativePrice * ethPrice
        ).toLocaleString();
        
        // console.log("PanelRow APR", apr)
        // console.log("PanelRow nativePrice", nativePrice)
        // console.log("PanelRow ethPrice", ethPrice)
        // console.log("PanelRow tokenAllocation", tokenAllocation)
        // console.log("PanelRow totalAllocation", totalAllocation)
        // console.log("PanelRow tokenTVL", tokenTVL)
        // console.log("PanelRow tokenPrice", tokenPrice)
        // console.log("PanelRow pendingToken", pendingToken)

        return (
            <PoolDisclosurePanel
                gifIcon={gifIcon}
                lpgifIcon={lpGifIcon}
                tokenName={tokenName}
                tokenTVL={tokenTVL * tokenPrice}
                apr={apr}
                userToken={userToken}
                lodgeEarned={lodgeEarned}
                tokenIndex={tokenIndex}
                refreshUI={updateUI}
                claimWriteAsync={claimWriteAsync}
            />
        )
    }, [nativePrice, ethPrice, tokenAllocation, totalAllocation, userToken, tokenTVL, tokenPrice, pendingToken])
    return (
        <PanelRow />
    )
}

export default FarmLandPool;
