import {User} from "./User";

export type Order = {
    order: "asc" | "desc";
    orderBy?: keyof User;
}