import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "./rootstore"
import { GetalluserDetail } from "../Server/User/getallUser"

// ---MIDDLEWARE---

// get all user details for user - manager
export const alluserDetails = createAsyncThunk('user/alluserDetails', async ({ access, workspace }) => {
    const alluserdetails = await GetalluserDetail(access, workspace)
    return alluserdetails
})

const userslistSlice = createSlice({
    name: 'userslistdata',
    initialState: initialstate.users,
    reducers: {
        clearUsers: (state) => {
            return initialstate.users;
        },
        alluserUpdate: (state, action) => {
            return action.payload
        },
        userBlockUpdate: (state, action) => {
            let abc;
            if (action.payload.value === 'Active') {
                abc = true;
            } else {
                abc = false;
            }
            return state.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        is_active: abc,
                    }
                }
                return user
            })
        },
        addNewUser: (state, action) => {
            return [...state, action.payload]
        }
    },

    extraReducers: (builder) => {
        builder.addCase(alluserDetails.fulfilled, (state, action) => {
            const userList = JSON.parse(action.payload)
            if (userList.message !== 'no users found') {
                return userList;
            }
        })

    }
})

export const { alluserUpdate, addNewUser, userBlockUpdate } = userslistSlice.actions
export default userslistSlice.reducer




