import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/users";
import {User} from "../../interfaces/User";
import {FilterFields} from "../../interfaces/FilterFields";

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
    users: [] as User[],
    filteredUsers: [] as User[],
    filters: {
        name: '',
        username: '',
        email: '',
        phone: ''
    } as FilterFields
}
export type UsersInitialStateType = typeof initialState

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setFilteredUsers: (state, action: PayloadAction<User[]>) => {
            state.filteredUsers = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterFields>) => {
            state.filters = action.payload;
        }
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
    setFilteredUsers,
    setFilters
} = usersSlice.actions;
export default usersSlice.reducer;