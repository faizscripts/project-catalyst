import type { TaskInterface } from '@/interfaces/tasks';
import type { ApiResponseType } from '@/types/api';
import { apiRequest } from '@/api/handler';

export const createTask = (data: Omit<TaskInterface, 'id'>): Promise<ApiResponseType<TaskInterface>> =>
    apiRequest<TaskInterface>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const fetchTasks = (): Promise<ApiResponseType<TaskInterface[]>> =>
    apiRequest<TaskInterface[]>('/tasks', { method: 'GET' });

export const fetchTask = (id: string): Promise<ApiResponseType<TaskInterface>> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, { method: 'GET' });

export const updateTask = (id: string, data: Partial<Omit<TaskInterface, 'id'>>): Promise<ApiResponseType<TaskInterface>> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteTask = (id: string): Promise<ApiResponseType<TaskInterface>> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'DELETE',
    });
