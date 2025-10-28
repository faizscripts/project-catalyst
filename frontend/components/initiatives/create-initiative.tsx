'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, useForm } from 'react-hook-form';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import Form from '@/components/ui/form/form';
import { CREATE_INITIATIVE_FORM_DEFAULT_VALUES, createInitiativeFormFields } from '@/constants/form';
import { InitiativeSchema } from '@/schemas/initiative';

interface CreateInitiativeProps {
    initiative?: InitiativeInterface;
    handleSubmit: (data: CreateInitiativeFormType) => void;
}

export default function CreateInitiative({ initiative, handleSubmit }: CreateInitiativeProps): React.JSX.Element {

    const isEditMode = initiative !== undefined;

    const form = useForm<CreateInitiativeFormType>({
        resolver: zodResolver(InitiativeSchema) as Resolver<CreateInitiativeFormType>,
        defaultValues: CREATE_INITIATIVE_FORM_DEFAULT_VALUES,
    });
    
    return (
        <>
            <h3 className="mb-10">{ isEditMode ? 'Update initiative' : 'Create initiative' }</h3>
            <Form form={ form } onSubmit={ handleSubmit } formFields={ createInitiativeFormFields } submitButtonLabel={ isEditMode ? 'Update' : 'Create' } />
        </>
    );
}
