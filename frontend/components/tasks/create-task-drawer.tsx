import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, useForm } from 'react-hook-form';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import Form from '@/components/ui/form/form';
import { CREATE_TASK_FORM_DEFAULT_VALUES, createTaskFormFields } from '@/constants/task';
import { TaskSchema } from '@/schemas/task';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shadcn/drawer';

interface CreateTaskDrawerProps {
    initiativeName: string;
    task?: TaskInterface;
    handleSubmit: (data: CreateTaskFormType) => void;
    isEditMode: boolean;
    children?: React.ReactNode;
}

export default function CreateTaskDrawer({ initiativeName, task, handleSubmit, isEditMode, children }: CreateTaskDrawerProps): React.JSX.Element {
    const [open, setOpen] = useState(false);
    
    const label = isEditMode ? 'Update' : 'Add';

    const form = useForm<CreateTaskFormType>({
        resolver: zodResolver(TaskSchema) as Resolver<CreateTaskFormType>,
        defaultValues: task ?? CREATE_TASK_FORM_DEFAULT_VALUES,
    });
    
    const onSubmit = (data: CreateTaskFormType): void => {
        handleSubmit(data);
        setOpen(false);
    };

    const handleOpenChange = (isOpen: boolean): void => {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset(task ?? CREATE_TASK_FORM_DEFAULT_VALUES);
        }
    };

    return (
        <Drawer open={ open } onOpenChange={ handleOpenChange } >
            <DrawerTrigger asChild>
                { children }
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        { label } Task
                    </DrawerTitle>
                    <DrawerDescription>
                        for <span className="font-semibold">{ initiativeName }</span> initiative
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex-center mb-8">
                    <Form
                        form={ form }
                        formFields={ createTaskFormFields }
                        submitButtonLabel={ label }
                        onSubmit={ onSubmit }
                        onCancel={ () => setOpen(false) } />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
