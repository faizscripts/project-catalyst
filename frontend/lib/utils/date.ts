import { format } from 'date-fns';

export function formatDateToShort(date: Date): string {
    return format(date, 'dd/MM/yy');
}

export function formatDateToInputValue(date: Date): string {
    return date.toISOString().split('T')[0];
}
