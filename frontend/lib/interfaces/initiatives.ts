import type { InitiativeStatus } from '@/types/initiatives';

export interface InitiativeInterface {
    id: string,
    name: string,
    description?: string,
    startDate: Date,
    endDate: Date,
    status: InitiativeStatus,
    progress?: number,
}
