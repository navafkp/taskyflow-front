import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";

import { GettingPersonalNotification } from "../Server/Notification/gettingPersonalNotification";
import { GettingBroadcastNotification } from "../Server/Notification/BroadcastNotification";

// -----MIDDLEWARES---
// get all notification
export const getBroadcastNotification = createAsyncThunk('user/getBroadcastNotification', ({ access, workspace }) => {
    const response = GettingBroadcastNotification(access, workspace) 
    return response
})

//  get all notification
export const getPersonalNotification = createAsyncThunk('user/getPersonalNotification', ({ access, workspace, email }) => {
    const response = GettingPersonalNotification(access, workspace, email)
    return response
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialstate.notifications,
    extraReducers: (builder) => {
        builder
            .addCase(getBroadcastNotification.fulfilled, (state, action) => {
                return {
                    ...state, broadcast: action.payload
                }
            })
            .addCase(getPersonalNotification.fulfilled, (state, action) => {
                if (action.payload.message === 'No notifications found') {
                    return {
                        ...state, personal: []
                    }
                } else {
                    return {
                        ...state, personal: action.payload
                    }
                }

            })
    }
})

export default notificationSlice.reducer;