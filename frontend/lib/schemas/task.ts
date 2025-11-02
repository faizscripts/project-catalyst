import { z } from 'zod';
import { taskStatusValues } from '@/types/tasks';

export const TaskSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50),
    description: z.string().optional(),
    dueDate: z.string(),
    status: z.enum(taskStatusValues),
    completionPercentage: z.number(),
});
