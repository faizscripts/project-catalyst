import { format } from 'date-fns';
import type { InitiativeInterface } from '@/interfaces/initiatives';

export function formatDateToShort(date: Date): string {
    return format(date, 'dd/MM/yy');
}

export function formatDateToInputValue(date: Date | string): string {
    if (!date) {
        return '';
    }

    if (typeof date === 'string') {
        return date.includes('T') ? date.split('T')[0] : date;
    }

    return date.toISOString().split('T')[0];
}

export default function formatInitiativeDates(initiative: InitiativeInterface): InitiativeInterface {
    return {
        ...initiative,
        startDate: formatDateToInputValue(initiative.startDate),
        endDate: formatDateToInputValue(initiative.endDate),
    };
}
