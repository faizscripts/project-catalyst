import { format } from 'date-fns';

export default function dateFormatter(date: Date): string {
    return format(date, 'dd/MM/yy');
}
