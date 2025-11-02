'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import { fetchInitiativesWithProgress } from '@/api/initiatives';
import { columns } from '@/components/initiatives/columns';
import { DataTable } from '@/components/initiatives/data-table';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

export default function InitiativesList(): React.JSX.Element {
    const { data: initiatives, isLoading, error } = useQuery<InitiativeInterface[]>({
        queryKey: ['initiatives'],
        queryFn: fetchInitiativesWithProgress,
    });

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        const normalized = normalizeError(error);
        return <ErrorComponent status={ normalized.status } message={ normalized.message } />;
    }

    return (
        <div className="full-height gap-4 p-4">
            <div className="flex justify-between">
                <h2>Initiatives list page</h2>
                <Link href="/initiatives/new">
                    <Button>Create new initiative</Button>
                </Link>
            </div>
            <DataTable data={ initiatives ?? [] } columns={ columns } />
        </div>
    );
}
