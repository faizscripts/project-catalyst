import type { InitiativeSchema } from '@/schemas/initiative';
import type { z } from 'zod';

export type FieldType = 'text' | 'number' | 'textarea' | 'date';

export type CreateInitiativeFormType = z.infer<typeof InitiativeSchema>;
