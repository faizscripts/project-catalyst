import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { CreateTaskFormType } from '@/types/form';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import ErrorComponent from '@/components/ui/error-component';
import LoadingComponent from '@/components/ui/loading-component';
import { useFetchInitiativeProgress } from '@/hooks/initiatives';
import { useFetchTasks, useSaveTask } from '@/hooks/tasks';
import { Button } from '@/shadcn/button';
import { Progress } from '@/shadcn/progress';
import { normalizeError } from '@/utils/error';

interface TasksListWrapperProps {
    initiative: InitiativeInterface;
}

export default function TasksListWrapper({ initiative }: TasksListWrapperProps): React.JSX.Element {
    const { data: tasks = [], isLoading: isFetchingTasks, error: isFetchingTasksError } = useFetchTasks(initiative.id);
    const { data: progressData, isFetching: isFetchingProgress, refetch: refetchProgress } = useFetchInitiativeProgress(initiative.id);

    const saveTask = useSaveTask();
    
    const handleSubmit = async (data: CreateTaskFormType): Promise<void> => {
      await saveTask.mutateAsync({ data, initiativeId: initiative.id, isEditMode: false });
      refetchProgress();
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
            <h3 className="text-left mb-4"> Progress </h3>
            {
                isFetchingProgress
                    ? <LoadingComponent />
                    : (
                        <div className="flex items-center gap-2">
                            <Progress value={ progressData?.progress } />
                            <span className="text-sm">{ progressData?.progress }%</span>
                        </div>
                    )
            }
            <div className="flex justify-between items-center mt-4">
                <h3>Tasks list</h3>
                <CreateTaskDrawer initiativeName={ initiative.name } handleSubmit={ handleSubmit } isEditMode={ false }>
                    <Button type="button" size="sm">Add task</Button>
                </CreateTaskDrawer>
            </div>
            <TasksList initiative={ initiative }  tasks={ tasks } refetchProgress={ refetchProgress } />
        </div>
    );
}
