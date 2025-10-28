import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { ApiResponseType } from '@/types/api';
import { apiRequest } from '@/api/handler';

export const createInitiative = (data: Omit<InitiativeInterface, 'id'>): Promise<ApiResponseType<InitiativeInterface>> =>
    apiRequest<InitiativeInterface>('/initiatives', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const fetchInitiatives = (): Promise<ApiResponseType<InitiativeInterface[]>> =>
    apiRequest<InitiativeInterface[]>('/initiatives', { method: 'GET' });

export const fetchInitiative = (id: string): Promise<ApiResponseType<InitiativeInterface>> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, { method: 'GET' });

export const updateInitiative = (id: string, data: Partial<Omit<InitiativeInterface, 'id'>>): Promise<ApiResponseType<InitiativeInterface>> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteInitiative = (id: string): Promise<ApiResponseType<InitiativeInterface>> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, {
        method: 'DELETE',
    });

export const getInitiativeProgress = (id: string): Promise<ApiResponseType<{ progress: number }>> =>
    apiRequest<{ progress: number }>(`/initiatives/${id}/progress`, {
        method: 'GET',
    });
