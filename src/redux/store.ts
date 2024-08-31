import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import usersSlice from "./slices/users-slice";

export const store = configureStore({
    reducer: {
        users: usersSlice
    },
    devTools: true
})

type StoreType = typeof store;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppRootStateType = ReturnType<StoreType['getState']>;