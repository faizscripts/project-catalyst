import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import { createTask, fetchTasksByInitiative } from '@/api/tasks';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { Button } from '@/shadcn/button';
import { normalizeError } from '@/utils/error';

interface TasksListWrapperProps {
    initiative: InitiativeInterface;
}

export default function TasksListWrapper({ initiative }: TasksListWrapperProps): React.JSX.Element {
    const isEditMode = initiative !== undefined;
    const queryClient = useQueryClient();
    const { data: tasks = [], isLoading: isFetchingTasks, error: isFetchingTasksError } = useQuery<TaskInterface[]>({
        queryKey: ['tasks', initiative!.id],
        queryFn: () => fetchTasksByInitiative(initiative!.id!),
        enabled: isEditMode,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation<TaskInterface, Error, CreateTaskFormType>({
        mutationFn: async (data: CreateTaskFormType) => {
            const payload = {
                ...data,
                dueDate: new Date(data.dueDate).toISOString(),
                initiativeId: initiative.id,
            };

            return await createTask(payload);
        },
        onSuccess: async (response: TaskInterface) => {
            if (response) {
                toast.success(`${response.name} task ${ isEditMode ? 'updated' : 'created' } successfully`);
                queryClient.invalidateQueries({ queryKey: ['tasks', initiative.id] });
            }
        },
        onError: (error: Error) => {
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
    });

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
                <CreateTaskDrawer initiativeName={ initiative.name } handleSubmit={ mutation.mutateAsync } isEditMode={ false }>
                    <Button type="button" size="sm">Add task</Button>
                </CreateTaskDrawer>
            </div>
            <TasksList tasks={ tasks } />
        </div>
    );
}
