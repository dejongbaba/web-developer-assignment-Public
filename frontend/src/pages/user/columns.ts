import {ColumnDef} from "@tanstack/react-table";
import {User} from "@/lib/definitions";

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email Address",
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row: {original}}) => {
            const {city, state, street, zipcode} = original?.address;
            return [street, city, state, zipcode].join(', ')
        }
    },
]
