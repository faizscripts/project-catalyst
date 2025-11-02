'use client';

import { useRouter } from 'next/navigation';
import type { FormFieldInterface } from '@/interfaces/form';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import TasksListWrapper from '@/components/tasks/tasks-list-wrapper';
import FormFieldWrapper from '@/components/ui/form/form-field-wrapper';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { ShadCnForm } from '@/shadcn/form';

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    formFields: FormFieldInterface<T>[];
    submitButtonLabel: string;
}

export default function Form<T extends FieldValues>({ form, onSubmit, formFields, submitButtonLabel }: FormProps<T>): React.JSX.Element {
    const router = useRouter();

    return (
        <ShadCnForm { ...form }>
            <form onSubmit={ onSubmit ? form.handleSubmit(onSubmit) : undefined } className="space-y-6 w-full max-w-md">
                { formFields.map((field: FormFieldInterface<T>) => (
                    <FormFieldWrapper key={ field.name } { ...field } />
                )) }
                <TasksListWrapper />
                <div className="mt-10">
                    { form.formState.isSubmitting ? (
                        <div className="flex justify-center">
                            <LoadingComponent />
                        </div>
                    ) : (
                        <div className="flex justify-around">
                            <Button type="submit">{ submitButtonLabel }</Button>
                            <Button type="button" variant="secondary" onClick={ () => router.back() }>Cancel</Button>
                        </div>
                    ) }
                </div>
            </form>
        </ShadCnForm>
    );
}
