import React, {useEffect, useState} from 'react';
import {DataTable, DataTableFilterMeta, DataTablePageEvent, DataTableStateEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {getUsers} from "../../redux/slices/users-slice";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const UsersTable = () => {
    const users = useSelector((state: AppRootStateType) => state.users.users);
    const loading = useSelector((state: AppRootStateType) => state.users.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <DataTable
            value={users}
            filterDisplay="row"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No data found"
            loading={loading}
        >
            <Column field="name" header="Name" filterField="name" sortable filter filterPlaceholder="Search"/>
            <Column field="username" sortable header="Username" filterField="username" filter
                    filterPlaceholder="Search"/>
            <Column field="email" sortable filter header="Email" filterPlaceholder="Search"/>
            <Column field="phone" header="Phone" filter filterPlaceholder="Search"/>
        </DataTable>
    );

};

export default UsersTable;

