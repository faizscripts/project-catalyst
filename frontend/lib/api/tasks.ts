import type { TaskInterface } from '@/interfaces/tasks';
import { apiRequest } from '@/api/handler';

export const createTask = (data: Omit<TaskInterface, 'id'>): Promise<TaskInterface> =>
    apiRequest<TaskInterface>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const fetchTasks = (): Promise<TaskInterface[]> =>
    apiRequest<TaskInterface[]>('/tasks', { method: 'GET' });

export const fetchTasksByInitiative = (initiativeId: string): Promise<TaskInterface[]> =>
    apiRequest<TaskInterface[]>(`/tasks/initiatives/${initiativeId}`, { method: 'GET' });

export const fetchTask = (id: string): Promise<TaskInterface> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, { method: 'GET' });

export const updateTask = (id: string, data: Partial<Omit<TaskInterface, 'id'>>): Promise<TaskInterface> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteTask = (id: string): Promise<TaskInterface> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'DELETE',
    });
