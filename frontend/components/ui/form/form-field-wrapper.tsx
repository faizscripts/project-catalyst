import { type ControllerRenderProps, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import type { FieldType, SelectOptionType } from '@/types/form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/form';
import { Input } from '@/shadcn/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/select';
import { Textarea } from '@/shadcn/textarea';

interface FormFieldWrapperProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
    type?: FieldType;
    isReadOnly?: boolean;
    selectOptions?: SelectOptionType[];
}

export default function FormFieldWrapper<T extends FieldValues>({ name, label, placeholder, description, type = 'text', isReadOnly = false, selectOptions }: FormFieldWrapperProps<T>): React.JSX.Element {

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
                            <Textarea placeholder={ placeholder } disabled={ disabled } readOnly={ isReadOnly } { ...field } />
                        )  : type === 'select' && selectOptions ? (
                            <Select
                                onValueChange={ field.onChange }
                                value={ field.value }
                                defaultValue={ field.value }>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        { selectOptions.map((selectOption: SelectOptionType) => {
                                            return <SelectItem key={ selectOption.value } value={ selectOption.value }>{ selectOption.label }</SelectItem>;
                                        }) }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input type={ type } placeholder={ placeholder } disabled={ disabled } readOnly={ isReadOnly } { ...field } />
                        ) }
                    </FormControl>
                    { description && <FormDescription>{ description }</FormDescription> }
                    <FormMessage />
                </FormItem>
            ) }
        />
    );
}
