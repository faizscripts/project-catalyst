'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, useForm } from 'react-hook-form';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateInitiativeFormType } from '@/types/form';
import Form from '@/components/ui/form/form';
import { CREATE_INITIATIVE_FORM_DEFAULT_VALUES, createInitiativeFormFields } from '@/lib/constants/form';
import { InitiativeSchema } from '@/schemas/initiative';

interface CreateInitiativeProps {
    initiative: InitiativeInterface;
}

export default function CreateInitiative({ initiative }: CreateInitiativeProps): React.JSX.Element {

    const form = useForm<CreateInitiativeFormType>({
        resolver: zodResolver(InitiativeSchema) as Resolver<CreateInitiativeFormType>,
        defaultValues: initiative ?? CREATE_INITIATIVE_FORM_DEFAULT_VALUES,
    });
    
    const onSubmit = (data: CreateInitiativeFormType): void => {
        console.info(data);
    };
    
    return (
        <div className="full-height flex-center">
            <Form form={ form } onSubmit={ onSubmit } formFields={ createInitiativeFormFields } />
        </div>
    );
}
