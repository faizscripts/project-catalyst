import type { QueryObserverResult } from '@tanstack/query-core';

export type InitiativeStatus = 'Planned' | 'Active' | 'Completed' | 'Cancelled';

export const initiativeStatusValues = ['Planned', 'Active', 'Completed', 'Cancelled'] as const;

export const initiativeStatusLabels: Record<InitiativeStatus, string> = {
    Planned: 'Planned',
    Active: 'Active',
    Completed: 'Completed',
    Cancelled: 'Cancelled',
};

export const initiativeStatusVariants = {
    Planned: 'secondary',
    Active: 'alternate',
    Completed: 'success',
    Cancelled: 'destructive',
} as const;

export type RefetchProgressType = () => Promise<QueryObserverResult<{ progress: number }, Error>>;
