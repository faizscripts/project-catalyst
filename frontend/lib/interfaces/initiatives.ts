import type { CreateInitiativeFormType } from '@/types/form';
import type { InitiativeStatus } from '@/types/initiatives';
import type { UseMutationResult } from '@tanstack/react-query';

export interface InitiativeInterface {
    id: string,
    name: string,
    description?: string,
    startDate: string,
    endDate: string,
    status: InitiativeStatus,
    progress?: number,
}

export interface SaveInitiativeMutateInterface {
    data: CreateInitiativeFormType, 
    initiativeId?: string,
    isEditMode: boolean,
}

export interface DeleteInitiativeMutateInterface {
    id: string;
    name: string;
}

export type DeleteInitiativeMutationResult = UseMutationResult<
    InitiativeInterface,
    Error,
    DeleteInitiativeMutateInterface,
    { previousInitiatives?: InitiativeInterface[] }
>;
