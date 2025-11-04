'use client';

import Link from 'next/link';
import { columns } from '@/components/initiatives/columns';
import { DataTable } from '@/components/initiatives/data-table';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { useFetchInitiatives } from '@/hooks/initiatives';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

export default function InitiativesList(): React.JSX.Element {
    const { data: initiatives, isLoading, error } = useFetchInitiatives();

    if (isLoading) {
        return (
            <div className="flex-center">
                <LoadingComponent />
            </div>
        );
    }

    if (error) {
        const normalized = normalizeError(error);
        return (
            <div className="flex-center">
                <ErrorComponent status={ normalized.status } message={ normalized.message } />
            </div>
        );
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
