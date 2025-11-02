import { Pencil, Trash2 } from 'lucide-react';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';

interface TasksActionsProps {
    task: TaskInterface;
}

export default function TasksActions({ task }: TasksActionsProps): React.JSX.Element {

    const handleSubmit = (data: CreateTaskFormType): void => {
    };

    return (
        <div className="flex-center gap-2">
            <CreateTaskDrawer task={ task } handleSubmit={ handleSubmit } isEditMode={ true }>
                <Pencil className="text-primary hover:cursor-pointer"  />
            </CreateTaskDrawer>
            <Trash2 className="text-destructive hover:cursor-pointer" />
        </div>
    );
}
