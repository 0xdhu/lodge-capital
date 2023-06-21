import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pendingGenesisRewards: ["0", "0", "0", "0", "0", "0", "0", "0"],
    lockedGenesisValues: [0, 0, 0, 0, 0, 0, 0, 0],

    pendingFarmLandRewards: ["0", "0", "0", "0", "0", "0", "0", "0"],
    lockedFarmLandValues: [0, 0, 0, 0, 0, 0, 0, 0]
}
// create a slice 
export const genesisSlice= createSlice({
    name:"genesis", // gensis and farmland
    initialState,
    reducers:{
        updateGenesisPoolPendingValueAtIndex:(state, action)=>{
            const { tokenIndex, pendingAmount } = action.payload;
            
            if (tokenIndex === undefined || tokenIndex === null || isNaN(tokenIndex)) {
                return;
            }

            if (tokenIndex >= 0) {
                const prevpendingGenesisRewards = state.pendingGenesisRewards;
                // Make a copy of the array
                const newArr = [...prevpendingGenesisRewards];
                
                // Update the value at the specified index
                newArr[tokenIndex] = pendingAmount;
    
                state.pendingGenesisRewards= newArr;
            }
        },
        updateGenesisPoolTVLAtIndex:(state, action)=>{
            const { tokenIndex, poolTVL } = action.payload;

            if (tokenIndex === undefined || tokenIndex === null || isNaN(tokenIndex)) {
                return;
            }
            
            if (tokenIndex >= 0) {
                const prevlockedGenesisValues = state.lockedGenesisValues;
                // Make a copy of the array
                const newArr = [...prevlockedGenesisValues];
                // Update the value at the specified index
                newArr[tokenIndex] = poolTVL;
    
                state.lockedGenesisValues= newArr;
            }
            // console.log(state.lockedGenesisValues)

        },

        updateFarmLandPoolPendingValueAtIndex:(state, action)=>{
            const { tokenIndex, pendingAmount } = action.payload;
            
            if (tokenIndex === undefined || tokenIndex === null || isNaN(tokenIndex)) {
                return;
            }

            if (tokenIndex >= 0) {
                const prevpendingFarmLandRewards = state.pendingFarmLandRewards;
                // Make a copy of the array
                const newArr = [...prevpendingFarmLandRewards];
                
                // Update the value at the specified index
                newArr[tokenIndex] = pendingAmount;
    
                state.pendingFarmLandRewards= newArr;
            }
        },
        updateFarmLandPoolTVLAtIndex:(state, action)=>{
            const { tokenIndex, poolTVL } = action.payload;
            // console.log("GTV", tokenIndex, poolTVL)
            if (tokenIndex === undefined || tokenIndex === null || isNaN(tokenIndex)) {
                return;
            }
            
            if (tokenIndex >= 0) {
                const prevlockedFarmLandValues = state.lockedFarmLandValues;
                // Make a copy of the array
                const newArr = [...prevlockedFarmLandValues];
                
                // Update the value at the specified index
                newArr[tokenIndex] = poolTVL;
    
                state.lockedFarmLandValues= newArr;
            }
            // console.log(state.lockedFarmLandValues)

        },
    }
})
// config the store 
const store= configureStore({
   reducer: {
      genesis: genesisSlice.reducer
   }
})

// export default the store 
export default store

// export the action
export const {
    updateGenesisPoolPendingValueAtIndex,
    updateGenesisPoolTVLAtIndex,
    updateFarmLandPoolPendingValueAtIndex,
    updateFarmLandPoolTVLAtIndex
} = genesisSlice.actions