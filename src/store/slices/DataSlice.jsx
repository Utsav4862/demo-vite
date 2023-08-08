import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"data",
    initialState:[],
    reducers:{
        addData(state, action){
            state.push(action.payload)
        },
        deleteData(state, action){
            state.splice(action.payload, 1)
        }
    }
})

export default dataSlice.reducer;
export const {addData, deleteData} = dataSlice.actions 