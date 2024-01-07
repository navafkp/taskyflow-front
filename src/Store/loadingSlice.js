import { createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";


const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialstate.isLoading,
    reducers: {
        setLoading: (state, action) => {
            return action.payload
        },
    },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer