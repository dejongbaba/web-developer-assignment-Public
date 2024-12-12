import {ColumnDef, Row} from "@tanstack/react-table";

export interface User {
    id?: string
    fullName: string
    emailAddress: string
    address: Address
}

export interface HeadingProp {
    email: string
    postCount: number
}

export interface BackProp {
    title: string
}

export interface PostGridProp {
    posts: Post[],
    onDeletePost: (id: number) => void
    onComplete: (res: Record<string, any>) => void

}

export interface PostCardProp extends Post {
    onDelete?: (id: number) => void
    type: "create" | 'read'
}

export interface Address {
    street: number
    state: string
    city: string
    zipcode: string
}

export interface Post {
    title?: string
    userId?: string
    id?: number
    body?: string
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onRowClick: (row: Row<TData>) => void;
}
