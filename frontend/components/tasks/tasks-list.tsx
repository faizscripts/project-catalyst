import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import TaskCard from '@/components/tasks/task-card';

interface TasksListProps {
    initiative: InitiativeInterface;
    tasks: TaskInterface[];
}

export default function TasksList({ initiative, tasks }: TasksListProps): React.JSX.Element {
    if (!tasks.length) {
        return (
            <p className="p-8 text-sm">No tasks found</p>
        );
    }

    return (
        <>
            { tasks.map((task: TaskInterface) => (
                <TaskCard initiative={ initiative } key={ task.id } task={ task } />
            )) }
        </>
    );
}
