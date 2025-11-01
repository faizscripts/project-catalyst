'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import { deleteInitiative } from '@/api/initiatives';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

interface InitiativeActionsProps {
    id: string;
    name: string;
}

export default function InitiativeActionsColumn({ id, name }: InitiativeActionsProps): React.JSX.Element {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteInitiative(id),
        onError: (error: Error, variables: void, context: { previousInitiatives: InitiativeInterface[] | undefined } | undefined) => {
            if (context?.previousInitiatives) {
                queryClient.setQueryData(['initiatives'], context.previousInitiatives);
            }
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
        onSuccess: () => {
            toast.success(`${name} initiative deleted successfully`);
            queryClient.setQueryData<InitiativeInterface[]>(['initiatives'], (old: InitiativeInterface[] | undefined) =>
                old?.filter((initiative: InitiativeInterface) => initiative.id !== id) ?? []
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['initiatives'] });
        },
    });

    return (
        <div className="flex justify-center gap-2">
            <Link href={ `/initiatives/${id}` }>
                <Button variant="default">
                    <Pencil />
                </Button>
            </Link>
            {
                deleteMutation.isPending
                    ? <LoadingComponent />
                    : <Button variant="destructive" onClick={ () => deleteMutation.mutateAsync() }>
                        <Trash2 />
                    </Button>
            }
        </div>
    );
}
