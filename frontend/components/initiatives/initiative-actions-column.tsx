'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import LoadingComponent from '@/components/ui/loading-component';
import { useDeleteInitiative } from '@/hooks/initiatives';
import { Button } from '@/shadcn/button';

interface InitiativeActionsProps {
    id: string;
    name: string;
}

export default function InitiativeActionsColumn({ id, name }: InitiativeActionsProps): React.JSX.Element {
    const deleteInitiative = useDeleteInitiative();

    return (
        <div className="flex justify-center gap-2">
            <Link href={ `/initiatives/${id}` }>
                <Button variant="default">
                    <Pencil />
                </Button>
            </Link>
            {
                deleteInitiative.isPending
                    ? <LoadingComponent />
                    : <Button variant="destructive" onClick={ () => deleteInitiative.mutateAsync({ id, name }) }>
                        <Trash2 />
                      </Button>
            }
        </div>
    );
}
