import { Pencil, Trash2 } from 'lucide-react';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import { useSaveTask } from '@/hooks/tasks';

interface TasksActionsProps {
    initiative: InitiativeInterface;
    task: TaskInterface;
}

export default function TasksActions({ initiative, task }: TasksActionsProps): React.JSX.Element {

    const saveTask = useSaveTask(initiative.id, true, task.id);

    return (
        <div className="flex-center gap-2">
            <CreateTaskDrawer initiativeName={ initiative.name } task={ task } handleSubmit={ saveTask.mutateAsync } isEditMode={ true }>
                <Pencil className="text-primary hover:cursor-pointer"  />
            </CreateTaskDrawer>
            <Trash2 className="text-destructive hover:cursor-pointer" />
        </div>
    );
}
