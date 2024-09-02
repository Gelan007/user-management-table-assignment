import {User} from "../interfaces/User";
import {FilterFields} from "../interfaces/FilterFields";

export const getFilteredDataStartWith = (filteredUsers: User[], fieldName: keyof FilterFields, text: string) => {
    return filteredUsers.filter(user => user[fieldName].toLowerCase().trim().startsWith(text.toLowerCase().trim()))
}


