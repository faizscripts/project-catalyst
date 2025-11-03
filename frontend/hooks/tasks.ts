import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import { createTask, updateTask } from '@/api/tasks';
import { normalizeError } from '@/utils/error';

export const useSaveTask = (initiativeId: string, isEditMode: boolean, taskId?: string): UseMutationResult<TaskInterface, Error, CreateTaskFormType> => {
    const queryClient = useQueryClient();
    
    return useMutation<TaskInterface, Error, CreateTaskFormType>({
        mutationFn: async (data: CreateTaskFormType) => {
            const payload = {
                ...data,
                dueDate: new Date(data.dueDate).toISOString(),
                initiativeId: initiativeId,
            };

            return isEditMode
                ? await updateTask(taskId!, payload)
                : await createTask(payload);
        },
        onSuccess: async (response: TaskInterface) => {
            if (response) {
                toast.success(`${response.name} task ${ isEditMode ? 'updated' : 'created' } successfully`);
                queryClient.invalidateQueries({ queryKey: ['tasks', initiativeId] });
            }
        },
        onError: (error: Error) => {
            const normalized = normalizeError(error);
            toast.error(normalized.message);
        },
    });
};
