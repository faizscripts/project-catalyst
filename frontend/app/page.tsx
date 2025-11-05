import { HydrationBoundary } from '@tanstack/react-query';
import { fetchInitiativesWithProgress } from '@/api/initiatives';
import InitiativesList from '@/components/initiatives/initiatives-list';
import { prefetchQuery } from '@/utils/react-query';

export const dynamic = 'force-dynamic';

export default async function Home(): Promise<React.JSX.Element> {
    const dehydratedState = await prefetchQuery(
        ['initiatives'],
        () => fetchInitiativesWithProgress()
    );

    return (
        <HydrationBoundary state={ dehydratedState }>
            <InitiativesList />
        </HydrationBoundary>
    );
}
