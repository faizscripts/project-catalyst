import type { CreateInitiativeFormType } from '@/types/form';
import { fetchInitiative } from '@/api/initiatives';
import CreateInitiative from '@/components/initiatives/create-initiative';
import ErrorComponent from '@/components/ui/error-component';

interface InitiativeDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function InitiativeDetailsPage({ params }: InitiativeDetailsPageProps): Promise<React.JSX.Element> {

    const { id } = await params;

    const { data: initiative, error } = await fetchInitiative(id);

    if (error) {
        return <ErrorComponent status={ error.status } message={ error.message } />;
    }

    if (!initiative) {
        return <ErrorComponent message="Initiative not found" />;
    }

    const handleSubmit = (data: CreateInitiativeFormType): void => {
        console.info('in handle submit', data);
    };

    return (
        <CreateInitiative initiative={ initiative } handleSubmit={ handleSubmit } />
    );
}
