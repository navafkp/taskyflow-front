import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { BoardCreateAxios, GetBoads } from "../Server/Board/getallBoard";


// -----MIDDLEWARES---

// create board
export const createNewBoard = createAsyncThunk('user/createNewBoard', async ({ access, workspace, id, name, description, visibility }) => {
    const res = await BoardCreateAxios(access, workspace, id, name, description, visibility)
    return res
})

// get all board
export const getAllBoads = createAsyncThunk('user/getAllBoads', async ({ access, workspace }) => {
    const res = await GetBoads(access, workspace)
    return res
})




const boardSlice = createSlice({
    name: 'boards',
    initialState: initialstate.allboards,
    reducers: {
        BoardUpdate: (state, action) => {
            return (
                [...state, action.payload]
            )
        },
        updateBoarddDeletion: (state, action) => {
            return state.filter(board => board.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBoads.fulfilled, (state, action) => {
                return action.payload.data
            })
            .addCase(createNewBoard.fulfilled, (state, action) => {
                return (
                    [...state, action.payload]
                )
            })
    }
})

export const { BoardUpdate, updateBoarddDeletion } = boardSlice.actions;
export default boardSlice.reducer