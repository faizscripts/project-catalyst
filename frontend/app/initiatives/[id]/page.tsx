import { fetchInitiative } from '@/api/initiatives';
import CreateInitiativeWrapper from '@/components/initiatives/create-initiative-wrapper';
import ErrorComponent from '@/components/ui/error-component';
import formatInitiativeDates from '@/utils/date';

interface InitiativeDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function InitiativeDetailsPage({ params }: InitiativeDetailsPageProps): Promise<React.JSX.Element> {

    const { id } = await params;

    const { data: rawInitiative, error } = await fetchInitiative(id);

    if (error) {
        return <ErrorComponent status={ error.status } message={ error.message } />;
    }

    if (!rawInitiative) {
        return <ErrorComponent message="Initiative not found" />;
    }

    const initiative = formatInitiativeDates(rawInitiative);

    return (
        <CreateInitiativeWrapper initiative={ initiative } />
    );
}
