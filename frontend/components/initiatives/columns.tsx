'use client';

import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import InitiativeActionsColumn from '@/components/initiatives/initiative-actions-column';
import StatusBadge from '@/components/ui/status-badge';
import { type InitiativeStatus, initiativeStatusLabels, initiativeStatusVariants } from '@/types/initiatives';
import { formatDateToShort } from '@/utils/date';

export const columns: ColumnDef<InitiativeInterface>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }: CellContext<InitiativeInterface, unknown>) => <div className="capitalize-first">{ row.getValue('name') }</div>,
    },
    {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ row }: CellContext<InitiativeInterface, unknown>) => <div>{ formatDateToShort(row.getValue('startDate')) }</div>,
    },
    {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: ({ row }: CellContext<InitiativeInterface, unknown>) => <div>{ formatDateToShort(row.getValue('endDate')) }</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: CellContext<InitiativeInterface, unknown>) => (
            <StatusBadge 
                status={ row.getValue('status') as InitiativeStatus } 
                labelMap={ initiativeStatusLabels }
                variantMap={ initiativeStatusVariants } />
        ),
    },
    {
        accessorKey: 'progress',
        header: 'Progress',
        cell: ({ row }: CellContext<InitiativeInterface, unknown>) => <div>{ row.getValue('progress') }%</div>,
    },
    {
        id: 'actions',
        header: () => <div className="flex justify-center">Actions</div>,
        cell: ({ row }: CellContext<InitiativeInterface, unknown>): React.JSX.Element => {
            const initiative = row.original;
            return (
                <InitiativeActionsColumn
                    id={ initiative.id }
                    name={ initiative.name } />
            );
        },
    },
];
