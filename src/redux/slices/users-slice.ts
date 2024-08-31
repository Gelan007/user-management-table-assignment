import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/users";
import {User} from "../../interfaces/User";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await usersAPI.getUsers();

            return {data: response.data}
        } catch (err: any) {
            return rejectWithValue(err);
        }
    });

const initialState = {
    isLoading: false,
    error: "" as string | null,
    users: [] as User[]
}
export type UsersInitialStateType = typeof initialState

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Invalid request"
            })
    }
})

export const {
} = usersSlice.actions;
export default usersSlice.reducer;