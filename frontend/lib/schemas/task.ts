import { z } from 'zod';
import { taskStatusValues } from '@/types/tasks';

export const TaskSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50),
    description: z.string().optional(),
    dueDate: z.string().nonempty('Due date is required'),
    status: z.enum(taskStatusValues),
    completionPercentage: z.coerce.number().min(0).max(100)
});
