import type { CreateTaskFormType } from '@/types/form';
import type { TaskStatus } from '@/types/tasks';

export interface TaskInterface {
    id: string,
    name: string,
    description?: string,
    dueDate: string,
    status: TaskStatus,
    completionPercentage: number,
    initiativeId: string,
}

export interface SaveTaskMutateInterface {
    data: CreateTaskFormType,
    initiativeId: string, 
    isEditMode: boolean, 
    taskId?: string,
}
