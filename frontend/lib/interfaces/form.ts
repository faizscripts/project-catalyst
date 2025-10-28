import type { FieldType } from '@/types/form';
import type { FieldValues, Path } from 'react-hook-form';

export interface FormFieldInterface<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: FieldType;
}
