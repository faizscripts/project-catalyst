import type { CreateTaskFormType } from '@/types/form';
import type { TaskStatus } from '@/types/tasks';
import type { UseMutationResult } from '@tanstack/react-query';

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

export interface DeleteTaskMutateInterface {
    taskId: string;
    taskName: string;
    initiativeId: string;
}

export type DeleteTaskMutationResult = UseMutationResult<
    TaskInterface,
    Error,
    DeleteTaskMutateInterface,
    { previousTasks?: TaskInterface[] }
>;
