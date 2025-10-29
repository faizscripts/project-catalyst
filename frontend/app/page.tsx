import Link from 'next/link';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import { fetchInitiatives, getInitiativeProgress } from '@/api/initiatives';
import { columns } from '@/components/initiatives/columns';
import { DataTable } from '@/components/initiatives/data-table';
import ErrorComponent from '@/components/ui/error-component';
import { Button } from '@/shadcn/button';
import formatInitiativeDates from '@/utils/date';

export default async function Home(): Promise<React.JSX.Element> {
    const { data: initiatives, error } = await fetchInitiatives();

    if (error) {
        return <ErrorComponent status={ error.status } message={ error.message } />;
    }

    const baseInitiatives = initiatives ?? [];

    const initiativesWithProgress = await Promise.all(
        baseInitiatives.map(async (initiative: InitiativeInterface) => {
            try {
                const { data: progressData, error: progressError } = await getInitiativeProgress(initiative.id);

                if (progressError || !progressData) {
                    console.warn(`Progress fetch failed for initiative ${initiative.id}:`, progressError);
                    return { ...initiative, progress: 0 };
                }

                return { ...formatInitiativeDates(initiative), progress: progressData.progress };
            } catch (err) {
                console.error(`Unexpected error fetching progress for ${initiative.id}:`, err);
                return { ...initiative, progress: 0 };
            }
        })
    );

    return (
        <div className="full-height gap-4 p-4">
            <div className="flex justify-between">
                <h3>Initiatives list page</h3>
                <Link href="/initiatives/new">
                    <Button> Create new initiative </Button>
                </Link>
            </div>
            <DataTable columns={ columns } data={ initiativesWithProgress } />
        </div>
    );
}
