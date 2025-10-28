import { type ControllerRenderProps, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import type { FieldType } from '@/types/form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/form';
import { Input } from '@/shadcn/input';
import { Textarea } from '@/shadcn/textarea';

interface FormFieldWrapperProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
    type?: FieldType;
}

export default function FormFieldWrapper<T extends FieldValues>({ name, label, placeholder, description, type = 'text' }: FormFieldWrapperProps<T>): React.JSX.Element {

    const { control, formState } = useFormContext<T>();
    const disabled = formState.isSubmitting;

    return (
        <FormField
            control={ control }
            name={ name }
            render={ ({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
                <FormItem>
                    <FormLabel>{ label }</FormLabel>
                    <FormControl>
                        { type === 'textarea' ? (
                            <Textarea placeholder={ placeholder } disabled={ disabled } { ...field } />
                        ) : (
                            <Input type={ type } placeholder={ placeholder } disabled={ disabled } { ...field } />
                        ) }
                    </FormControl>
                    { description && <FormDescription>{ description }</FormDescription> }
                    <FormMessage />
                </FormItem>
            ) }
        />
    );
}
