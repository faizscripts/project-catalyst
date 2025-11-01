'use client';

import { type ColumnDef, type Cell, type Header, type HeaderGroup, type Row, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import { DataTablePagination } from '@/shadcn/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>): React.JSX.Element {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="overflow-hidden rounded-md border mb-6">
                <Table>
                    <TableHeader>
                        { table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
                            <TableRow key={ headerGroup.id }>
                                { headerGroup.headers.map((header: Header<TData, unknown>) => {
                                    return (
                                        <TableHead key={ header.id }>
                                            { header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                ) }
                                        </TableHead>
                                    );
                                }) }
                            </TableRow>
                        )) }
                    </TableHeader>
                    <TableBody>
                        { table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: Row<TData>) => (
                                <TableRow
                                    key={ row.id }
                                    data-state={ row.getIsSelected() && 'selected' }>
                                    { row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                                        <TableCell key={ cell.id }>
                                            { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                        </TableCell>
                                    )) }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={ columns.length } className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={ table } />
        </>
    );
}
