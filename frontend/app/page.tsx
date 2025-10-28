import type { InitiativeInterface } from '@/interfaces/initiatives';
import { fetchInitiatives, getInitiativeProgress } from '@/api/initiatives';
import ErrorComponent from '@/components/error-component';
import { columns } from '@/components/initiatives/columns';
import { DataTable } from '@/components/initiatives/data-table';

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

                return { ...initiative, progress: progressData.progress };
            } catch (err) {
                console.error(`Unexpected error fetching progress for ${initiative.id}:`, err);
                return { ...initiative, progress: 0 };
            }
        })
    );

    return (
        <div className="full-height p-4">
            <DataTable columns={ columns } data={ initiativesWithProgress } />
        </div>
    );
}
