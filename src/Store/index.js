import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from "redux-persist/lib/storage";
import userdataSlice from "./userdataSlice";
import { combineReducers } from "@reduxjs/toolkit";
import userslistSlice from './userslistSlice'
import loadingSlice from "./loadingSlice";
import notificationSlice from "./notificationSlice";
import boardSlice from "./boardSlice";
import columnsSlice from "./columnsSlice";
import cardSlice from "./cardSlice";
import MeetingSlice from "./MeetingSlice";

const persistConfig = {
    key: 'root',
    storage,
};

// root reducer
const rootReducer = combineReducers({
    usertoken: authSlice,
    userData: userdataSlice,
    users: userslistSlice,
    loading: loadingSlice,
    notification: notificationSlice,
    boards: boardSlice,
    columns: columnsSlice,
    cardData: cardSlice,
    meetingData: MeetingSlice,
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
                    REGISTER],
            },
        }),

});
// persist all data to local storage
const persistor = persistStore(store)

export { store, persistor };
