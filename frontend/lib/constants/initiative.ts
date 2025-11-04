import type { FormFieldInterface } from '@/interfaces/form';
import type { CreateInitiativeFormType } from '@/types/form';
import { type InitiativeStatus, initiativeStatusValues } from '@/types/initiatives';
import { formatDateToInputValue } from '@/utils/date';

const today = new Date();

export const CREATE_INITIATIVE_FORM_DEFAULT_VALUES: CreateInitiativeFormType = {
    name: '',
    description: '',
    startDate: formatDateToInputValue(today),
    endDate: '',
    status: 'Planned',
};

const initiativeStatusOptions = initiativeStatusValues.map((status: InitiativeStatus) => ({
    label: status,
    value: status,
}));

export const createInitiativeFormFields: FormFieldInterface<CreateInitiativeFormType>[] = [
    { name: 'name', label: 'Name', placeholder: "Initiative's name" },
    { name: 'description', label: 'Description', placeholder: 'A brief description of the initiative', type: 'textarea' },
    { name: 'startDate', label: 'Start Date' , type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date'  },
    { name: 'status', label: 'Status', type: 'select', selectOptions: initiativeStatusOptions },
];
