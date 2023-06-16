import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pendingRewards: ["0", "0", "0", "0", "0", "0", "0", "0"],
    lockedValues: [0, 0, 0, 0, 0, 0, 0, 0]
}
// create a slice 
export const genesisSlice= createSlice({
    name:"genesis",
    initialState,
    reducers:{
        updatePendingValueAtIndex:(state, action)=>{
            const { tokenIndex, pendingAmount } = action.payload;
            if (!tokenIndex || isNaN(tokenIndex)) {
                return;
            }

            if (tokenIndex && tokenIndex >= 0) {
                const prevPendingRewards = state.pendingRewards;
                // Make a copy of the array
                const newArr = [...prevPendingRewards];
                
                // Update the value at the specified index
                newArr[tokenIndex] = pendingAmount;
    
                state.pendingRewards= newArr;
            }
        },
        updatePoolTVLAtIndex:(state, action)=>{
            const { tokenIndex, poolTVL } = action.payload;

            if (!tokenIndex || isNaN(tokenIndex)) {
                return;
            }
            
            if (tokenIndex && tokenIndex >= 0) {
                const prevLockedValues = state.lockedValues;
                // Make a copy of the array
                const newArr = [...prevLockedValues];
                
                // Update the value at the specified index
                newArr[tokenIndex] = poolTVL;
    
                state.lockedValues= newArr;
            }
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
    updatePendingValueAtIndex,
    updatePoolTVLAtIndex
} = genesisSlice.actions