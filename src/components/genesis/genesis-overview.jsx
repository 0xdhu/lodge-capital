// import { useContext } from "react";
import { useSelector } from "react-redux";

// const { default: GenesisContext } = require("@/contexts/GenesisContext");

function sumArray(arr) {
    if (!arr) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const a = parseFloat(arr[i]) || 0;
        sum += isNaN(a) ? 0: a ;
    }
    return sum;
}

const StakingOverview = ({levelPriceInEth, lodgePriceInEth, ethPrice}) => {
    // const { pendingGenesisRewards, lockedGenesisValues } = useContext(GenesisContext);
    const { pendingGenesisRewards, lockedGenesisValues, pendingFarmLandRewards, lockedFarmLandValues } = useSelector(state => state.genesis);
    // console.log("Overview", lockedFarmLandValues)
    return (
        <div className=" flex w-full mx-auto justify-between max-w-7xl mt-4 items-center gap-2 rounded-lg   py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75l">
            <div className=" w-full flex-row flex h-auto justify-between   mt-4  rounded-lg bg-white  px-4 py-2  text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 text-center">
                
                <div className="flex flex-col">
                    <div className=" flex-auto text-left">LEVEL TO HARVEST: </div>
                    <div className=" flex-auto text-left text-xl">
                        {
                            (sumArray(pendingGenesisRewards)).toLocaleString()
                        }
                        <span className="text-base">
                        {` ($${parseFloat(
                            (pendingGenesisRewards.reduce((accumulator, currentValue) => {
                                const a = parseFloat(accumulator) || 0;
                                const b = parseFloat(currentValue) || 0;
                                return isNaN(a) ? 0: a + isNaN(b) ? 0: b;
                            }, 0)) *
                            (levelPriceInEth * ethPrice)
                        ).toLocaleString()})`}
                        </span>
                    </div>

                    <div className=" flex-auto text-left">LODGE TO HARVEST: </div>
                    <div className=" flex-auto text-left text-xl">
                        {
                            (sumArray(pendingFarmLandRewards)).toLocaleString()
                        }
                        <span className="text-base">
                            {` ($${parseFloat(
                                (pendingFarmLandRewards.reduce((accumulator, currentValue) => {
                                    const a = parseFloat(accumulator) || 0;
                                    const b = parseFloat(currentValue) || 0;
                                    return isNaN(a) ? 0: a + isNaN(b) ? 0: b;
                                }, 0)) *
                                (lodgePriceInEth * ethPrice)
                            ).toLocaleString()})`}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className=" flex-auto text-right font-bold">
                        Farms & Staking TVL
                    </div>
                    <div className=" flex-auto font-bold text-xl text-right">
                        {"$"}
                        {
                            (sumArray(lockedGenesisValues) + sumArray(lockedFarmLandValues)).toFixed(2)
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
        </div>
    )
}

export default StakingOverview;