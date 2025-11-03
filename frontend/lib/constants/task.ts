import type { FormFieldInterface } from '@/interfaces/form';
import type { CreateTaskFormType } from '@/types/form';
import { type TaskStatus, taskStatusLabels, taskStatusValues } from '@/types/tasks';

export const CREATE_TASK_FORM_DEFAULT_VALUES: CreateTaskFormType = {
    name: '',
    description: '',
    dueDate: '',
    status: 'NotStarted',
    completionPercentage: 0,
};

export const taskStatusOptions = taskStatusValues.map((status: TaskStatus) => ({
    label: taskStatusLabels[status],
    value: status,
}));

export const createTaskFormFields: FormFieldInterface<CreateTaskFormType>[] = [
    { name: 'name', label: 'Name', placeholder: "Task's name" },
    { name: 'description', label: 'Description', placeholder: 'A brief description of the task', type: 'textarea' },
    { name: 'dueDate', label: 'Due Date' , type: 'date' },
    { name: 'status', label: 'Status', type: 'select', selectOptions: taskStatusOptions },
    { name: 'completionPercentage', label: 'Completion Percentage', type: 'number' },
];
