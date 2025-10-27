import type { InitiativeInterface } from '@/interfaces/initiatives';
import { apiRequest } from '@/api/handler';

export const createInitiative = (data: Omit<InitiativeInterface, 'id'>): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>('/initiatives', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const fetchInitiatives = (): Promise<InitiativeInterface[]> =>
    apiRequest<InitiativeInterface[]>('/initiatives', { method: 'GET' });

export const fetchInitiative = (id: string): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, { method: 'GET' });

export const updateInitiative = (id: string, data: Partial<Omit<InitiativeInterface, 'id'>>): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteInitiative = (id: string): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, {
        method: 'DELETE',
    });

export const getInitiativeProgress = (id: string): Promise<{ progress: number }> =>
    apiRequest<{ progress: number }>(`/initiatives/${id}/progress`, {
        method: 'GET',
    });
