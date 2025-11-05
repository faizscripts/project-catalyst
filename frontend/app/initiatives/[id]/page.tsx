import { HydrationBoundary } from '@tanstack/react-query';
import { fetchInitiativeWithProgress } from '@/api/initiatives';
import CreateInitiativeWrapper from '@/components/initiatives/create-initiative-wrapper';
import { prefetchQuery } from '@/utils/react-query';

interface InitiativeDetailsPageProps {
    params: {
        id: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function InitiativeDetailsPage({ params }: InitiativeDetailsPageProps): Promise<React.JSX.Element> {

    const { id } = await params;

    const dehydratedState = await prefetchQuery(
        ['initiative', id],
        () => fetchInitiativeWithProgress(id)
    );

    return (
        <HydrationBoundary state={ dehydratedState }>
            <CreateInitiativeWrapper initiativeId={ id } />
        </HydrationBoundary>
    );
}
