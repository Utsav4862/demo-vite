import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./slices/DataSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer:{
        data: DataSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    }
})

export default store