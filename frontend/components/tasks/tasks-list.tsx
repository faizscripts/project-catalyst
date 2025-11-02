import type { TaskInterface } from '@/interfaces/tasks';
import TaskCard from '@/components/tasks/task-card';

interface TasksListProps {
    tasks: TaskInterface[];
}

export default function TasksList({ tasks }: TasksListProps): React.JSX.Element {
    if (!tasks.length) {
        return (
            <p className="p-8 text-sm">No tasks found</p>
        );
    }

    return (
        <>
            { tasks.map((task: TaskInterface) => ( <TaskCard key={ task.id } task={ task } />)) }
        </>
    );
}
