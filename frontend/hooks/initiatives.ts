import { type UseQueryResult, type UseMutationResult, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SaveInitiativeMutateInterface, DeleteInitiativeMutateInterface, DeleteInitiativeMutationResult, InitiativeInterface } from '@/interfaces/initiatives';
import { createInitiative, deleteInitiative, fetchInitiativesWithProgress, fetchInitiativeWithProgress, updateInitiative } from '@/api/initiatives';
import { normalizeError } from '@/utils/error';

export const useFetchInitiatives = (): UseQueryResult<InitiativeInterface[], Error> => {
    return useQuery<InitiativeInterface[]>({
        queryKey: ['initiatives'],
        queryFn: fetchInitiativesWithProgress,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useFetchInitiative = (initiativeId: string, isEditMode: boolean): UseQueryResult<InitiativeInterface, Error> => {
    return useQuery({
        queryKey: ['initiative', initiativeId],
        queryFn: () => fetchInitiativeWithProgress(initiativeId!),
        enabled: !!initiativeId && isEditMode,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useSaveInitiative = (): UseMutationResult<InitiativeInterface, Error, SaveInitiativeMutateInterface> => {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    return useMutation<InitiativeInterface, Error, SaveInitiativeMutateInterface>({
        mutationFn: async ({ data, initiativeId, isEditMode }: SaveInitiativeMutateInterface) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { progress, ...rest } = data;

            const payload = {
                ...rest,
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
            };

            return isEditMode
                ? await updateInitiative({ id: initiativeId!, ...payload })
                : await createInitiative(payload);
        },
        onSuccess: async (response: InitiativeInterface, { isEditMode }: SaveInitiativeMutateInterface) => {
            if (response) {
                toast.success(`${response.name} initiative ${isEditMode ? 'updated' : 'created'} successfully`);

                queryClient.setQueryData<InitiativeInterface[]>(['initiatives'], (oldData: InitiativeInterface[] | undefined = []) => {
                    const filtered = oldData.filter((i: InitiativeInterface) => i.id !== response.id);
                    return [...filtered, { ...response, progress: 0 }];
                });

                isEditMode
                    ? router.push('/')
                    : router.push(`/initiatives/${ response.id }`);
            }
        },
        onError: (error: Error) => {
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
    });
};

export const useDeleteInitiative = (): DeleteInitiativeMutationResult => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: DeleteInitiativeMutateInterface) => await deleteInitiative(id),
        onError: (error: Error, _: DeleteInitiativeMutateInterface, context: { previousInitiatives: InitiativeInterface[] | undefined } | undefined) => {
            if (context?.previousInitiatives) {
                queryClient.setQueryData(['initiatives'], context.previousInitiatives);
            }
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
        onSuccess: async (_: InitiativeInterface, { id, name }: DeleteInitiativeMutateInterface) => {
            toast.success(`${name} initiative deleted successfully`);
            queryClient.setQueryData<InitiativeInterface[]>(['initiatives'], (old: InitiativeInterface[] | undefined) =>
                old?.filter((initiative: InitiativeInterface) => initiative.id !== id) ?? []
            );
        },
    });
};
