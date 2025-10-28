import type { FormFieldInterface } from '@/interfaces/form';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import FormFieldWrapper from '@/components/ui/form/form-field-wrapper';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { ShadCnForm } from '@/shadcn/form';

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit?: SubmitHandler<T>;
    formFields: FormFieldInterface<T>[];
}

export default function Form<T extends FieldValues>({ form, onSubmit, formFields }: FormProps<T>): React.JSX.Element {
    return (
        <ShadCnForm { ...form }>
            <form onSubmit={ onSubmit ? form.handleSubmit(onSubmit) : undefined } className="space-y-6 w-full max-w-md">
                { formFields.map((field: FormFieldInterface<T>) => (
                    <FormFieldWrapper key={ field.name } { ...field } />
                )) }
                <div className="flex justify-center">
                    { form.formState.isSubmitting ? (
                        <LoadingComponent />
                    ) : (
                        <Button type="submit">Submit</Button>
                    ) }
                </div>
            </form>
        </ShadCnForm>
    );
}
