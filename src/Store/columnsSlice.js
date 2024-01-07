import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";

import { AddNewColumn } from "../Server/Columns/AddNewColumn";
import { GetColumns } from "../Server/Columns/getColumns";


// -----MIDDLEWARES---

// get all columns
export const getAllColumns = createAsyncThunk('user/getAllColumns', async ({ access, board_slug }) => {
    const response = await GetColumns(access, board_slug)
    return response
})

// add a new columns
export const addingColumns = createAsyncThunk('user/addingColumns', async ({ access, boardId, columnTitle, newPosition}) => {
    const response = await AddNewColumn(access, boardId, columnTitle, newPosition)
    return response
})


const columnsSlice = createSlice({
    name: 'columns',
    initialState: initialstate.columns,
    extraReducers: (builder) => {
        builder
            .addCase(getAllColumns.fulfilled, (state, action) => {
                return (
                    action.payload
                )
            })
            .addCase(addingColumns.fulfilled, (state, action) => {
                return (
                    [...state, action.payload]
                )
            })
    }
})

export default columnsSlice.reducer;