import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { GetuserDetail } from "../Server/User/userDetail";

// --MIDDLEWARE---

// get user details while logged in
export const userDetail = createAsyncThunk('user/userDetail', async (access) => {
    const data = await GetuserDetail(access)
    return data
})

const userdataSlice = createSlice({
    name: 'userdata',
    initialState: initialstate.userData,
    reducers: {
        clearUser: (state) => {
            return initialstate.userData;
        },
        updateUser: (state, action) => {
            return ({
                ...state,
                name: action.payload.name,
                username: action.payload.name,
                email: action.payload.email,
                designation: action.payload.designation,
                profile_image_base64: action.payload.image,
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDetail.fulfilled, (state, action) => {
                let profile_image_base64 = action.payload.profile_image_base64;
                if (profile_image_base64 && !profile_image_base64.startsWith("data:image/jpeg;base64,")) {
                    profile_image_base64 = "data:image/jpeg;base64," + profile_image_base64;
                }
                return { ...action.payload, profile_image_base64 }
            })
    },
});

export const { clearUser, updateUser } = userdataSlice.actions
export default userdataSlice.reducer