import { dehydrate, QueryClient, type DehydratedState, type QueryKey } from '@tanstack/react-query';

/**
 * Prefetches a query on the server and returns its dehydrated state.
 * @param key - The React Query key for caching.
 * @param queryFn - Async function that fetches the data for the query.
 * @returns DehydratedState for use inside <HydrationBoundary state={...} />
 */
export async function prefetchQuery<TData>(
    key: QueryKey,
    queryFn: () => Promise<TData>
): Promise<DehydratedState> {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: key,
            queryFn,
        });
    } catch (error) {
        console.error('Prefetch failed for query key:', key, error);
        queryClient.setQueryData(key, null as TData | null);
    }

    return dehydrate(queryClient);
}
