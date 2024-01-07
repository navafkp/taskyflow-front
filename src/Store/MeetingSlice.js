import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { getMeetings } from "../Server/Meeting/GetMeeting";

// -----MIDDLEWARES---

// get all meeting under workspace
export const getAllMeeting = createAsyncThunk('user/getAllMeeting', async ({ access, workspace }) => {
    const response = await getMeetings(access, workspace)
    return response
})

const MeetingSlice = createSlice({
    name: 'meetingData',
    initialState: initialstate.meetingData,
    reducers: {
        updateMeetingData: (state, action) => {
            return (
                [...state, action.payload]
            )
        },
        meetingDelete: (state, action) => {
            return state?.filter((meeting) => meeting.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMeeting.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const { updateMeetingData, meetingDelete } = MeetingSlice.actions
export default MeetingSlice.reducer