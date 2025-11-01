import { z } from 'zod';
import type { CreateInitiativeFormType } from '@/types/form';
import { initiativeStatusValues } from '@/types/initiatives';

export const InitiativeSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(initiativeStatusValues),
    progress: z.number(),
})
    .refine(
        (data: CreateInitiativeFormType) => new Date(data.endDate) > new Date(data.startDate),
        {
            message: 'End date must be after start date',
            path: ['endDate'],
        }
    );
