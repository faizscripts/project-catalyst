import type { TaskInterface } from '@/interfaces/tasks';
import { apiRequest } from '@/api/handler';
import { formatDateToInputValue } from '@/utils/date';

export const createTask = async (data: Omit<TaskInterface, 'id'>): Promise<TaskInterface> => {
    const task = await apiRequest<TaskInterface>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return {
        ...task,
        dueDate: formatDateToInputValue(task.dueDate)
    };
};

export const fetchTasks = (): Promise<TaskInterface[]> =>
    apiRequest<TaskInterface[]>('/tasks', { method: 'GET' });

export const fetchTasksByInitiative = async (initiativeId: string): Promise<TaskInterface[]> => {
    const tasks = await apiRequest<TaskInterface[]>(`/tasks/initiatives/${initiativeId}`, { method: 'GET' });
    return tasks.map((task: TaskInterface) => {
        return {
            ...task,
            dueDate: formatDateToInputValue(task.dueDate)
        };
    });
};

export const fetchTask = (id: string): Promise<TaskInterface> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, { method: 'GET' });

export const updateTask = async (id: string, data: Partial<Omit<TaskInterface, 'id'>>): Promise<TaskInterface> => {
    const task = await apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
    return {
        ...task,
        dueDate: formatDateToInputValue(task.dueDate)
    };
};

export const deleteTask = (id: string): Promise<TaskInterface> =>
    apiRequest<TaskInterface>(`/tasks/${id}`, {
        method: 'DELETE',
    });
