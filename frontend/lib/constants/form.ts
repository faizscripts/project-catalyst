import type { FormFieldInterface } from '@/interfaces/form';
import type { CreateInitiativeFormType } from '@/types/form';

const today = new Date();

export const CREATE_INITIATIVE_FORM_DEFAULT_VALUES: CreateInitiativeFormType = {
    name: '',
    description: '',
    startDate: today,
    endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
    status: 'Planned',
};

export const createInitiativeFormFields: FormFieldInterface<CreateInitiativeFormType>[] = [
    { name: 'name', label: 'Name', placeholder: "Initiative's name" },
    { name: 'description', label: 'Description', placeholder: 'A brief description of the initiative', type: 'textarea' },
    { name: 'startDate', label: 'Start Date' , type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date'  },
    { name: 'status', label: 'Status' },
];
