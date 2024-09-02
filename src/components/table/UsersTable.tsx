import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {getUsers} from "../../redux/slices/users-slice";
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField
} from "@mui/material";
import {useFilteredUsers} from "../../hooks/useFilteredUsers";
import {useSortedUsers} from "../../hooks/useSortedUsers";
import {User} from "../../interfaces/User";
import {useSelector} from "react-redux";


const UsersTable = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector((state: AppRootStateType) => state.users.isLoading);
    const error = useSelector((state: AppRootStateType) => state.users.error);
    const {filteredUsers, handleFilterChange, filters} = useFilteredUsers();
    const {handleRequestSort, sortedUsers, order} = useSortedUsers(filteredUsers);
    const boxAlignCenterStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const getTableHeadCellStyles = (orderBy: keyof User) => {
        return {
            fontWeight: 'bold',
            fontSize: '17px',
            backgroundColor: order.orderBy === orderBy ? 'rgba(24,118,210,0.1)' : 'inherit'
        }
    }

    const getTableSortLabel = (orderBy: keyof User, label: string) => {
        return (
            <TableCell sx={getTableHeadCellStyles(orderBy)}>
                <TableSortLabel
                    active={order.orderBy === orderBy}
                    direction={order.orderBy === orderBy ? order.order : 'asc'}
                    onClick={() => handleRequestSort(orderBy)}
                >
                    {label}
                </TableSortLabel>
            </TableCell>
        );
    }

    const getTableTextField = (name: keyof User, value: string) => {
        return (
            <TableCell align="right">
                <TextField
                    name={name}
                    value={value}
                    onChange={handleFilterChange}
                    placeholder={`Filter by ${name}`}
                    variant="standard"
                    fullWidth
                />
            </TableCell>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {getTableSortLabel('name', "Name")}
                        {getTableSortLabel('username', "Username")}
                        {getTableSortLabel('email', "Email")}
                        {getTableSortLabel('phone', "Phone")}
                    </TableRow>
                    <TableRow>
                        {getTableTextField('name', filters.name)}
                        {getTableTextField('username', filters.username)}
                        {getTableTextField('email', filters.email)}
                        {getTableTextField('phone', filters.phone)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box sx={boxAlignCenterStyles}>
                                    <CircularProgress/>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) || error && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box sx={{
                                    ...boxAlignCenterStyles,
                                    color: 'red',
                                    fontSize: "18px"
                                }}>
                                    {error}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) || filteredUsers.length <= 0 && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box sx={{
                                    ...boxAlignCenterStyles,
                                    color: 'rgba(24,118,210,0.9)',
                                    fontSize: "18px"
                                }}>
                                    No data found
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) || (
                        sortedUsers.map((user) => (
                            <TableRow key={user.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell align="left" sx={{fontSize: '15px'}}>{user.name}</TableCell>
                                <TableCell align="left" sx={{fontSize: '15px'}}>{user.username}</TableCell>
                                <TableCell align="left" sx={{fontSize: '15px'}}>{user.email}</TableCell>
                                <TableCell align="left" sx={{fontSize: '15px'}}>{user.phone}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;