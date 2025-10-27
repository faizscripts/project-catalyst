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
