import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateTaskFormType } from '@/types/form';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { useFetchTasks, useSaveTask } from '@/hooks/tasks';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

interface TasksListWrapperProps {
    initiative: InitiativeInterface;
}

export default function TasksListWrapper({ initiative }: TasksListWrapperProps): React.JSX.Element {
    const { data: tasks = [], isLoading: isFetchingTasks, error: isFetchingTasksError } = useFetchTasks(initiative.id);

    const saveTask = useSaveTask();
    
    const handleSubmit = async (data: CreateTaskFormType): Promise<void> => {
      await saveTask.mutateAsync({ data, initiativeId: initiative.id, isEditMode: false });  
    };

    if (isFetchingTasks) {
        return (
            <div className="flex-center">
                <LoadingComponent />
            </div>
        );
    }

    if (isFetchingTasksError) {
        const normalized = normalizeError(isFetchingTasksError);
        return (
            <div className="flex-center">
                <ErrorComponent status={ normalized.status } message={ normalized.message } />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3>Tasks list</h3>
                <CreateTaskDrawer initiativeName={ initiative.name } handleSubmit={ handleSubmit } isEditMode={ false }>
                    <Button type="button" size="sm">Add task</Button>
                </CreateTaskDrawer>
            </div>
            <TasksList initiative={ initiative }  tasks={ tasks } />
        </div>
    );
}
