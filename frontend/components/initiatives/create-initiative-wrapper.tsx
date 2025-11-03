'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import { createInitiative, fetchInitiativeWithProgress, updateInitiative } from '@/api/initiatives';
import CreateInitiativeComponent from '@/components/initiatives/create-initiative-component';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { normalizeError } from '@/utils/error';

interface CreateInitiativeWrapperProps {
    initiativeId?: string;
}

export default function CreateInitiativeWrapper({ initiativeId }: CreateInitiativeWrapperProps): React.JSX.Element {
    const router = useRouter();
    const queryClient = useQueryClient();
    const isEditMode = initiativeId !== undefined;

    const { data: initiative, isLoading: isFetchingInitiative, error: isFetchingInitiativeError } = useQuery({
        queryKey: ['initiative', initiativeId],
        queryFn: () => fetchInitiativeWithProgress(initiativeId!),
        enabled: isEditMode,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation<InitiativeInterface, Error, CreateInitiativeFormType>({
        mutationFn: async (data: CreateInitiativeFormType) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { progress, ...rest } = data;

            const payload = {
                ...rest,
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
            };

            return isEditMode
                ? await updateInitiative({ id: initiativeId, ...payload })
                : await createInitiative(payload);
        },
        onSuccess: async (response: InitiativeInterface) => {
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

    if (isEditMode && isFetchingInitiative) {
        return <LoadingComponent />;
    }
    
    if (isEditMode && isFetchingInitiativeError) {
        const normalized = normalizeError(isFetchingInitiativeError);
        return <ErrorComponent status={ normalized.status } message={ normalized.message } />;
    }

    return <CreateInitiativeComponent initiative={ initiative } handleSubmit={ mutation.mutateAsync } isEditMode={ isEditMode } />;
}
