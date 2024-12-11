import {ColumnDef, Row} from "@tanstack/react-table";

export interface User {
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
    onComplete: (res: Response) => void

}

export interface PostCardProp extends Post {
    onDelete: (id: number) => void
    type: "create" | 'read'
}

export interface Address {
    street: number
    state: string
    city: string
    zipCode: string
}

export interface Post {
    title: string
    userId: number
    id: number
    body: string
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],

    onRowClicked?(row: Row<TData>): void;
}
