import { useQuery } from '@tanstack/react-query';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import { fetchTasksByInitiative } from '@/api/tasks';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

interface TasksListWrapperProps {
    initiativeId?: string;
}

export default function TasksListWrapper({ initiativeId }: TasksListWrapperProps): React.JSX.Element {

    const isEditMode = initiativeId !== undefined;

    const { data: tasks = [], isLoading: isFetchingTasks, error: isFetchingTasksError } = useQuery<TaskInterface[]>({
        queryKey: ['tasks', initiativeId],
        queryFn: () => fetchTasksByInitiative(initiativeId!),
        enabled: isEditMode,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    if (isEditMode && isFetchingTasks) {
        return (
            <div className="flex-center">
                <LoadingComponent />
            </div>
        );
    }

    if (isEditMode && isFetchingTasksError) {
        const normalized = normalizeError(isFetchingTasksError);
        return (
            <div className="flex-center">
                <ErrorComponent status={ normalized.status } message={ normalized.message } />
            </div>
        );
    }

    const handleSubmit = (data: CreateTaskFormType): void => {
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3>Tasks list</h3>
                <CreateTaskDrawer handleSubmit={ handleSubmit } isEditMode={ false }>
                    <Button size="sm">Add task</Button>
                </CreateTaskDrawer>
            </div>
            <TasksList tasks={ tasks } />
        </div>
    );
}
