import { z } from 'zod';
import type { CreateInitiativeFormType } from '@/types/form';

const initiativeStatusValues = ['Planned', 'Active', 'Completed', 'Cancelled'] as const;

export const InitiativeSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    status: z.enum(initiativeStatusValues),
})
    .refine(
        (data: CreateInitiativeFormType) => data.endDate > data.startDate,
        {
            message: 'End date must be after start date',
            path: ['endDate'],
        }
    );
