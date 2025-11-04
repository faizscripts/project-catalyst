import type { InitiativeInterface } from '@/interfaces/initiatives';
import type { TaskInterface } from '@/interfaces/tasks';
import type { RefetchProgressType } from '@/types/initiatives';
import TasksActions from '@/components/tasks/tasks-actions';
import StatusBadge from '@/components/ui/status-badge';
import { Card, CardContent } from '@/shadcn/card';
import { taskStatusLabels, taskStatusVariants } from '@/types/tasks';
import { formatDateToShort } from '@/utils/date';

interface TaskCardProps {
    initiative: InitiativeInterface;
    task: TaskInterface;
    refetchProgress: RefetchProgressType;
}

export default function TaskCard({ initiative, task, refetchProgress }: TaskCardProps): React.JSX.Element {
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
                            <StatusBadge
                                status={ task.status }
                                labelMap={ taskStatusLabels }
                                variantMap={ taskStatusVariants } />
                            &nbsp; - { task.completionPercentage }%
                        </div>
                    </div>
                    <div className="flex items-center ml-4 shrink-0">
                        <TasksActions initiative={ initiative } task={ task } refetchProgress={ refetchProgress } />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
