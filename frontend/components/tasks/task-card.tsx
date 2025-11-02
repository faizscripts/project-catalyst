import type { TaskInterface } from '@/interfaces/tasks';
import TasksActions from '@/components/tasks/tasks-actions';
import { Card, CardContent } from '@/shadcn/card';
import { formatDateToShort } from '@/utils/date';

interface TaskCardProps {
    task: TaskInterface;
}

export default function TaskCard({ task }: TaskCardProps): React.JSX.Element {
    return (
        <Card className="my-4 p-2">
            <CardContent className="px-2 text-left text-sm">
                <div className="flex justify-between">
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="capitalize-first truncate">
                            { task.name }
                        </div>
                        <div>
                            Due on { formatDateToShort(task.dueDate) }
                        </div>
                        <div>
                            { task.status } - { task.completionPercentage }%
                        </div>
                    </div>
                    <div className="flex items-center ml-4 shrink-0">
                        <TasksActions task={ task } />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
