import { useQuery } from '@tanstack/react-query';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import { fetchTasksByInitiative } from '@/api/tasks';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { useSaveTask } from '@/hooks/tasks';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

interface TasksListWrapperProps {
    initiative: InitiativeInterface;
}

export default function TasksListWrapper({ initiative }: TasksListWrapperProps): React.JSX.Element {
    const { data: tasks = [], isLoading: isFetchingTasks, error: isFetchingTasksError } = useQuery<TaskInterface[]>({
        queryKey: ['tasks', initiative!.id],
        queryFn: () => fetchTasksByInitiative(initiative!.id!),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const saveTask = useSaveTask(initiative!.id, false);

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
                <CreateTaskDrawer initiativeName={ initiative.name } handleSubmit={ saveTask.mutateAsync } isEditMode={ false }>
                    <Button type="button" size="sm">Add task</Button>
                </CreateTaskDrawer>
            </div>
            <TasksList initiative={ initiative }  tasks={ tasks } />
        </div>
    );
}
