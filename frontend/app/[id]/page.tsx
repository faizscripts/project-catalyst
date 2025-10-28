import { fetchInitiative } from '@/api/initiatives';
import ErrorComponent from '@/components/error-component';

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

    return (
        <div className="p-4">
            <p>Initiative details page { initiative.name }</p>
        </div>
    );
}
