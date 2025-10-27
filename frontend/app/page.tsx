import type { InitiativeInterface } from '@/interfaces/initiatives';
import { fetchInitiatives, getInitiativeProgress } from '@/api/initiatives';
import { columns } from '@/components/initiatives/columns';
import { DataTable } from '@/components/initiatives/data-table';

export default async function Home(): Promise<React.JSX.Element> {
    const initiatives = await fetchInitiatives();

    const initiativesWithProgress = await Promise.all(
        initiatives.map(async (initiative: InitiativeInterface) => {
            try {
                const { progress } = await getInitiativeProgress(initiative.id);
                return { ...initiative, progress };
            } catch (error) {
                console.error(`Failed to fetch progress for ${initiative.id}:`, error);
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
