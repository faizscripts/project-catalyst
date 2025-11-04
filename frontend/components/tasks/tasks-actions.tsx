import { Pencil, Trash2 } from 'lucide-react';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import LoadingComponent from '@/components/ui/loading-component';
import { useDeleteTask, useSaveTask } from '@/hooks/tasks';

interface TasksActionsProps {
    initiative: InitiativeInterface;
    task: TaskInterface;
}

export default function TasksActions({ initiative, task }: TasksActionsProps): React.JSX.Element {

    const saveTask = useSaveTask();

    const deleteTask = useDeleteTask();

    const handleSubmit = async (data: CreateTaskFormType): Promise<void> => {
        await saveTask.mutateAsync({ data, initiativeId: initiative.id, isEditMode: true, taskId: task.id });
    };
    
    const handleDelete = async (): Promise<void> => {
        deleteTask.mutateAsync({ taskId: task.id, taskName: task.name, initiativeId: initiative.id });
    };

    return (
        <div className="flex-center gap-2">
            <CreateTaskDrawer initiativeName={ initiative.name } task={ task } handleSubmit={ handleSubmit } isEditMode={ true }>
                <Pencil className="text-primary hover:cursor-pointer"  />
            </CreateTaskDrawer>
            { 
                deleteTask.isPending 
                    ? <LoadingComponent /> 
                    : <Trash2 className="text-destructive hover:cursor-pointer" onClick={ handleDelete } />
            }
        </div>
    );
}
