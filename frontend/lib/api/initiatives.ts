import type { InitiativeInterface } from '@/interfaces/initiatives';
import { apiRequest } from '@/api/handler';
import formatInitiativeDates from '@/utils/date';

const fetchInitiatives = (): Promise<InitiativeInterface[]> =>
    apiRequest<InitiativeInterface[]>('/initiatives', { method: 'GET' });

const fetchInitiative = (id: string): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, { method: 'GET' });

export const createInitiative = (data: Omit<InitiativeInterface, 'id'>): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>('/initiatives', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const updateInitiative = (data: InitiativeInterface): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteInitiative = (id: string): Promise<InitiativeInterface> =>
    apiRequest<InitiativeInterface>(`/initiatives/${id}`, { method: 'DELETE' });

const getInitiativeProgress = (id: string): Promise<{ progress: number }> =>
    apiRequest<{ progress: number }>(`/initiatives/${id}/progress`, { method: 'GET' });

export const fetchInitiativeWithProgress = async ( id: string ): Promise<InitiativeInterface> => {
    const initiative = await fetchInitiative(id);

    const [progressData] = await Promise.all([
        getInitiativeProgress(id).catch(() => ({ progress: 0 })),
    ]);

    return {
        ...formatInitiativeDates(initiative),
        progress: progressData.progress,
    };
};

export const fetchInitiativesWithProgress= async(): Promise<InitiativeInterface[]> => {
    const baseInitiatives = await fetchInitiatives();

    return await Promise.all(
        baseInitiatives.map(async (initiative: InitiativeInterface) => {
            try {
                const { progress } = await getInitiativeProgress(initiative.id);
                return { ...formatInitiativeDates(initiative), progress };
            } catch (err) {
                console.warn(`Progress fetch failed for initiative ${initiative.id}`, err);
                return { ...formatInitiativeDates(initiative), progress: 0 };
            }
        })
    );
};
