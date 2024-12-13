import {DataTableProps} from "@/lib/definitions";

import {flexRender, getCoreRowModel, Row, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export function Grid<TData, TValue>({
                                        onNext, onPrev,
                                        currentPage, totalPages, totalRecords,
                                        columns, onPageClick,
                                        data, onRowClick,
                                    }: DataTableProps<TData, TValue> & { currentPage?: number, totalPages?: number, totalRecords?: number, onNext?: () => void, onPageClick?: (page: number) => void, onPrev?: () => void }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const _onRowClicked = (event: React.MouseEvent<HTMLTableRowElement>, row: Row<TData>) => {
        event.stopPropagation();
        onRowClick && onRowClick(row);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages as number, currentPage + 1);

        // Add ellipsis at the start if there are pages before the current range
        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem key="start-ellipsis">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        // Render the visible page numbers
        for (let i = startPage; i <= endPage; i++) {
            console.log('active', i, currentPage)
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === currentPage} // Highlight current page
                        onClick={(e) => {
                            e.preventDefault();
                            onPageClick?.(i); // Trigger page click handler
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Add ellipsis at the end if there are pages after the current range
        if (endPage < totalPages) {
            pageNumbers.push(
                <PaginationItem key="end-ellipsis">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        return pageNumbers;
    };
    return (
        <div className='space-y-2'>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='p-6' key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={(event) => {
                                        _onRowClicked(event, row)
                                    }}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className='p-6 text-[#535862]' key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination className="justify-end">
                <PaginationContent>
                    <PaginationItem onClick={onPrev}>
                        <PaginationPrevious/>
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem onClick={onNext}>
                        <PaginationNext/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}


export default Grid;
