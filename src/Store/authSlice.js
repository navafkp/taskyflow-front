import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "./rootstore";
import { UserAccess, UserLogin } from "../Server/User/userAuth";

// -----MIDDLEWARES---

// user
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
    const authdata = await UserLogin(email, password);
    return authdata
});
// get access from refresh
export const GetAccess = createAsyncThunk('user/GetAccess', async ({ refresh }) => {
    const authdata = await UserAccess(refresh)
    return authdata
})


const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate.usertoken,
    reducers: {
        Logout: (state) => {
            return initialstate.usertoken;
        },
        Success: (state, action) => {
            return {
                ...state,
                registerSuccess: action.payload.message,
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    return {
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'user',
                        is_authenticated: true,
                        registerSuccess: null,
                    };
                }
            })
            .addCase(GetAccess.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'user',
                        is_authenticated: true,
                        registerSuccess: null,
                    }
                }
            })
    },
});

export const { Logout, Success } = authSlice.actions;
export default authSlice.reducer

