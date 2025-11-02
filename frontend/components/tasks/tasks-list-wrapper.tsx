import Link from 'next/link';
import type { TaskInterface } from '@/interfaces/tasks';
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

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3>Tasks list</h3>
                <Link href="/initiatives/new">
                    <Button variant="default" size="sm">Add new task</Button>
                </Link>
            </div>
            <TasksList tasks={ tasks } />
        </div>
    );
}
