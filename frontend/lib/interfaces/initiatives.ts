import type { InitiativeStatus } from '@/types/initiatives';

export interface InitiativeInterface {
    id: string,
    name: string,
    description?: string,
    startDate: string,
    endDate: string,
    status: InitiativeStatus,
    progress?: number,
}
