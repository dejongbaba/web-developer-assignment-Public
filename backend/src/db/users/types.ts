import {Address} from "../Addresses/types";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface UserWithAddress extends User {
    address?: Address;
}

export interface UsersResponse {
    users: UserWithAddress[];
    totalRecords: number;
    totalPages: number;
    currentPage: number
}
