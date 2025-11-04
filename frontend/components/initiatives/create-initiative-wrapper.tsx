'use client';

import type { CreateInitiativeFormType } from '@/types/form';
import CreateInitiativeComponent from '@/components/initiatives/create-initiative-component';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { useFetchInitiative, useSaveInitiative } from '@/hooks/initiatives';
import { normalizeError } from '@/utils/error';

interface CreateInitiativeWrapperProps {
    initiativeId?: string;
}

export default function CreateInitiativeWrapper({ initiativeId }: CreateInitiativeWrapperProps): React.JSX.Element {
    const isEditMode = initiativeId !== undefined;

    const { data: initiative, isLoading: isFetchingInitiative, error: isFetchingInitiativeError } = useFetchInitiative(initiativeId!, isEditMode);

    const saveInitiative = useSaveInitiative();
    
    const handleSubmit = async (data: CreateInitiativeFormType): Promise<void> => {
        await saveInitiative.mutateAsync({ data, initiativeId, isEditMode });
    };

    if (isEditMode && isFetchingInitiative) {
        return (
            <div className="flex-center">
                <LoadingComponent />
            </div>
        );
    }
    
    if (isEditMode && isFetchingInitiativeError) {
        const normalized = normalizeError(isFetchingInitiativeError);
        return (
            <div className="flex-center">
                <ErrorComponent status={ normalized.status } message={ normalized.message } />
            </div>
        );
    }

    return <CreateInitiativeComponent initiative={ initiative } handleSubmit={ handleSubmit } isEditMode={ isEditMode } />;
}
