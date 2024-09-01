import React, { useEffect } from 'react';
import {useDebouncedValue} from "./useDebouncedValue";
import {User} from "../interfaces/User";
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../redux/store";
import {setFilteredUsers, setFilters} from "../redux/slices/users-slice";
import {getFilteredDataStartWith} from "../utils/filter";

export const useFilteredUsers = () => {
    const filters = useSelector((state: AppRootStateType) => state.users.filters);
    const users = useSelector((state: AppRootStateType) => state.users.users);
    const filteredUsers = useSelector((state: AppRootStateType) => state.users.filteredUsers);

    const dispatch = useAppDispatch();

    const debouncedName = useDebouncedValue(filters.name, 300);
    const debouncedUsername = useDebouncedValue(filters.username, 300);
    const debouncedEmail = useDebouncedValue(filters.email, 300);
    const debouncedPhone = useDebouncedValue(filters.phone, 300);

    useEffect(() => {
        const applyFilters = () => {
            let filteredData = users;

            if (debouncedName) {
                filteredData = getFilteredDataStartWith(filteredData, 'name', debouncedName);
            }
            if (debouncedUsername) {
                filteredData = getFilteredDataStartWith(filteredData, 'username', debouncedUsername);
            }
            if (debouncedEmail) {
                filteredData = getFilteredDataStartWith(filteredData, 'email', debouncedEmail);
            }
            if (debouncedPhone) {
                filteredData = getFilteredDataStartWith(filteredData, 'phone', debouncedPhone);
            }

            dispatch(setFilteredUsers(filteredData));
        };

        applyFilters();
    }, [debouncedName, debouncedUsername, debouncedEmail, debouncedPhone, users]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilters({
            ...filters,
            [e.target.name]: e.target.value
        }));
    };

    return { filteredUsers, handleFilterChange, filters };
};