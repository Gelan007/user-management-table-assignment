import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {getUsers} from "../../redux/slices/users-slice";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {useFilteredUsers} from "../../hooks/useFilteredUsers";


const UsersTable = () => {
    const dispatch = useAppDispatch();
    const {filteredUsers, handleFilterChange, filters} = useFilteredUsers();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Username</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <TextField
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                                placeholder="Filter by Name"
                                variant="standard"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell align="right">
                            <TextField
                                name="username"
                                value={filters.username}
                                onChange={handleFilterChange}
                                placeholder="Filter by Username"
                                variant="standard"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell align="right">
                            <TextField
                                name="email"
                                value={filters.email}
                                onChange={handleFilterChange}
                                placeholder="Filter by Email"
                                variant="standard"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell align="right">
                            <TextField
                                name="phone"
                                value={filters.phone}
                                onChange={handleFilterChange}
                                placeholder="Filter by Phone"
                                variant="standard"
                                fullWidth
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;