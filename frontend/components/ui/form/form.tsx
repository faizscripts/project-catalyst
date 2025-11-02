'use client';

import type { FormFieldInterface } from '@/interfaces/form';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import FormFieldWrapper from '@/components/ui/form/form-field-wrapper';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { ShadCnForm } from '@/shadcn/form';

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    formFields: FormFieldInterface<T>[];
    children?: React.ReactNode;
    submitButtonLabel: string;
    onSubmit: SubmitHandler<T>;
    onCancel: () => void;
}

export default function Form<T extends FieldValues>({ form, formFields, children, submitButtonLabel, onSubmit, onCancel }: FormProps<T>): React.JSX.Element {
    return (
        <ShadCnForm { ...form }>
            <form onSubmit={ onSubmit ? form.handleSubmit(onSubmit) : undefined } className="space-y-6 w-full max-w-md">
                { formFields.map((field: FormFieldInterface<T>) => (
                    <FormFieldWrapper key={ field.name } { ...field } />
                )) }
                { children }
                <div className="mt-10">
                    { form.formState.isSubmitting ? (
                        <div className="flex justify-center">
                            <LoadingComponent />
                        </div>
                    ) : (
                        <div className="flex justify-around">
                            <Button type="submit">{ submitButtonLabel }</Button>
                            <Button type="button" variant="secondary" onClick={ onCancel }>Cancel</Button>
                        </div>
                    ) }
                </div>
            </form>
        </ShadCnForm>
    );
}
