import { type UseMutationResult, type UseQueryResult, useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { SaveTaskMutateInterface, TaskInterface } from '@/interfaces/tasks';
import { createTask, fetchTasksByInitiative, updateTask } from '@/api/tasks';
import { normalizeError } from '@/utils/error';

export const useFetchTasks = (initiativeId: string): UseQueryResult<TaskInterface[], Error> => {
    return useQuery<TaskInterface[]>({
        queryKey: ['tasks', initiativeId],
        queryFn: () => fetchTasksByInitiative(initiativeId!),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useSaveTask = (): UseMutationResult<TaskInterface, Error, SaveTaskMutateInterface> => {
    const queryClient = useQueryClient();
    
    return useMutation<TaskInterface, Error, SaveTaskMutateInterface>({
        mutationFn: async ({ data, initiativeId, isEditMode, taskId }: SaveTaskMutateInterface) => {
            const payload = {
                ...data,
                dueDate: new Date(data.dueDate).toISOString(),
                initiativeId: initiativeId,
            };

            return isEditMode
                ? await updateTask(taskId!, payload)
                : await createTask(payload);
        },
        onSuccess: async (response: TaskInterface, { isEditMode, initiativeId }: SaveTaskMutateInterface) => {
            if (response) {
                toast.success(`${response.name} task ${ isEditMode ? 'updated' : 'created' } successfully`);
                queryClient.setQueryData<TaskInterface[]>(['tasks', initiativeId], (old: TaskInterface[] | undefined = []) => {
                    const filtered = old.filter((task: TaskInterface) => task.id !== response.id);
                    return [...filtered, response];
                });
                queryClient.invalidateQueries({ queryKey: ['tasks', initiativeId] });
            }
        },
        onError: (error: Error) => {
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
    });
};
