import type { TaskInterface } from '@/interfaces/tasks';
import type { CreateTaskFormType } from '@/types/form';
import CreateTaskDrawer from '@/components/tasks/create-task-drawer';
import TasksList from '@/components/tasks/tasks-list';
import { Button } from '@/shadcn/button';
import { formatDateToShort } from '@/utils/date';

export default function TasksListWrapper(): React.JSX.Element {

    const tasks: TaskInterface[] = [
        {
            id: '1',
            name: 'task 1',
            description: 'description',
            dueDate: formatDateToShort(new Date()),
            status: 'Not Started',
            completionPercentage: 0,
            initiativeId: '1',
        },
        {
            id: '2',
            name: 'task 2',
            description: 'description',
            dueDate: formatDateToShort(new Date()),
            status: 'In Progress',
            completionPercentage: 20,
            initiativeId: '1',
        }
    ];

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
