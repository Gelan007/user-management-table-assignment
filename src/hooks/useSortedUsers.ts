import React, {useMemo} from "react";
import {User} from "../interfaces/User";
import {Order} from "../interfaces/Order";

export const useSortedUsers = (users: User[]) => {
    const [order, setOrder] = React.useState<Order>({order: "asc"});

    const handleRequestSort = (property: keyof User) => {
        const isAsc = order.orderBy === property && order.order === 'asc';
        setOrder({orderBy: property, order: isAsc ? 'desc' : 'asc'});
    };

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            if (order.orderBy && a[order.orderBy] < b[order.orderBy]) {
                return order.order === 'asc' ? -1 : 1;
            }
            if (order.orderBy && a[order.orderBy] > b[order.orderBy]) {
                return order.order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [users, order])

    return {handleRequestSort, sortedUsers, order}
}