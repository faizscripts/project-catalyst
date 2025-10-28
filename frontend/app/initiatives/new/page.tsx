'use client';

import type { CreateInitiativeFormType } from '@/types/form';
import CreateInitiative from '@/components/initiatives/create-initiative';

export default function NewInitiativePage(): React.JSX.Element {
    
    const handleSubmit = (data: CreateInitiativeFormType): void => {
        console.info('in handle submit', data);
    };
    
    return (
        <CreateInitiative handleSubmit={ handleSubmit } />
    );
}
