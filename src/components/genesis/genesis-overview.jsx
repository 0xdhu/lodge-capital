// import { useContext } from "react";
import { useSelector } from "react-redux";

// const { default: GenesisContext } = require("@/contexts/GenesisContext");

function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const a = parseFloat(arr[i]) || 0;
        sum += isNaN(a) ? 0: a ;
    }
    return sum;
}

const GenesisOverview = ({nativePrice, ethPrice}) => {
    // const { pendingRewards, lockedValues } = useContext(GenesisContext);
    const { pendingRewards, lockedValues } = useSelector(state => state.genesis);

    return (
        <div className=" flex w-full mx-auto justify-between max-w-7xl mt-4 items-center gap-2 rounded-lg   py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75l">
            <div className=" w-full  flex-col flex h-auto justify-between   mt-4  rounded-lg bg-white  px-4 py-2  text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 text-center">
            {" "}
            <div className=" flex-auto text-right font-bold">
                Farms & Staking TVL
            </div>
            <div className=" flex-auto text-left">LEVEL TO HARVEST: </div>
            <div className=" flex-auto text-left text-xl">
                {
                    (sumArray(pendingRewards)).toLocaleString()
                }
            </div>
            <div className=" flex-auto  text-left">
                ${" "}
                {parseFloat(
                    (pendingRewards.reduce((accumulator, currentValue) => {
                        const a = parseFloat(accumulator) || 0;
                        const b = parseFloat(currentValue) || 0;
                        return isNaN(a) ? 0: a + isNaN(b) ? 0: b;
                    }, 0)) *
                    (nativePrice * ethPrice)
                ).toLocaleString()}
            </div>
            <div className=" flex-auto font-bold text-xl text-right">
                {"$"}
                {
                    (sumArray(lockedValues)).toFixed(2)
                }
                {/* {parseFloat(
                sushiTVL * sushiPrice +
                    arbTVL * arbPrice +
                    daiTVL +
                    ethLevelTVL * (lpPrice / lpSupply || 1) +
                    ethTVL * ethPrice +
                    usdcTVL
                ).toFixed(2)}{" "} */}
                {" staked"}
            </div>
            </div>
        </div>
    )
}

export default GenesisOverview;