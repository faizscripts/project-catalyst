'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, useForm } from 'react-hook-form';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import Form from '@/components/ui/form/form';
import { CREATE_INITIATIVE_FORM_DEFAULT_VALUES, createInitiativeFormFields } from '@/constants/form';
import { InitiativeSchema } from '@/schemas/initiative';

interface CreateInitiativeComponentProps {
    initiative?: InitiativeInterface;
    handleSubmit: (data: CreateInitiativeFormType) => void;
    isEditMode: boolean;
}

export default function CreateInitiativeComponent({ initiative, handleSubmit, isEditMode }: CreateInitiativeComponentProps): React.JSX.Element {

    const form = useForm<CreateInitiativeFormType>({
        resolver: zodResolver(InitiativeSchema) as Resolver<CreateInitiativeFormType>,
        defaultValues: initiative ?? CREATE_INITIATIVE_FORM_DEFAULT_VALUES,
    });
    
    return (
        <>
            <h3 className="mb-10">{ isEditMode ? 'Update initiative' : 'Create initiative' }</h3>
            <Form form={ form } onSubmit={ handleSubmit } formFields={ createInitiativeFormFields } submitButtonLabel={ isEditMode ? 'Update' : 'Create' } />
        </>
    );
}
