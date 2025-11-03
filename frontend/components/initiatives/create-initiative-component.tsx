'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type Resolver, useForm } from 'react-hook-form';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import TasksListWrapper from '@/components/tasks/tasks-list-wrapper';
import Form from '@/components/ui/form/form';
import { CREATE_INITIATIVE_FORM_DEFAULT_VALUES, createInitiativeFormFields } from '@/constants/initiative';
import { InitiativeSchema } from '@/schemas/initiative';

interface CreateInitiativeComponentProps {
    initiative?: InitiativeInterface;
    handleSubmit: (data: CreateInitiativeFormType) => void;
    isEditMode: boolean;
}

export default function CreateInitiativeComponent({ initiative, handleSubmit, isEditMode }: CreateInitiativeComponentProps): React.JSX.Element {
    const router = useRouter();

    const label = isEditMode ? 'Update' : 'Create';

    const form = useForm<CreateInitiativeFormType>({
        resolver: zodResolver(InitiativeSchema) as Resolver<CreateInitiativeFormType>,
        defaultValues: initiative ?? CREATE_INITIATIVE_FORM_DEFAULT_VALUES,
    });
    
    return (
        <>
            <h2 className="mb-8">{ label } initiative</h2>
            <Form 
                form={ form }
                formFields={ createInitiativeFormFields }
                submitButtonLabel={ label }
                onSubmit={ handleSubmit }   
                onCancel={ () => router.push('/') }>
                { isEditMode && <TasksListWrapper initiative={ initiative! } /> }
            </Form>
        </>
    );
}
