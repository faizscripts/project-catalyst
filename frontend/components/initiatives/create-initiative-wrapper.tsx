'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import { createInitiative, updateInitiative } from '@/api/initiatives';
import CreateInitiativeComponent from '@/components/initiatives/create-initiative-component';

interface CreateInitiativeWrapperProps {
    initiative?: InitiativeInterface;
}

export default function CreateInitiativeWrapper({ initiative }: CreateInitiativeWrapperProps): React.JSX.Element {
    const router = useRouter();
    const isEditMode = initiative !== undefined;

    const handleSubmit = async (data: CreateInitiativeFormType): Promise<void> => {
        const payload = {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
        };

        const { data: result, error } = isEditMode
            ? await updateInitiative({ id: initiative.id, ...payload })
            : await createInitiative(payload);

        if (error) {
            console.error('Error submitting order:', error);
            toast.error(error.message);
        }
        
        if (result) {
            toast.success(`${result.name} initiative ${isEditMode ? 'updated' : 'created'} successfully`);
            router.push('/');
        }
    };

    return <CreateInitiativeComponent initiative={ initiative } handleSubmit={ handleSubmit } isEditMode={ isEditMode } />;
}
