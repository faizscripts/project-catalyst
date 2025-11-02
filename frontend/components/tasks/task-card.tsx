import type { TaskInterface } from '@/interfaces/tasks';
import { Card, CardContent } from '@/shadcn/card';

interface TaskCardProps {
    task: TaskInterface;
}

export default function TaskCard({ task }: TaskCardProps): React.JSX.Element {
    return (
        <Card className="my-4 p-2">
            <CardContent className="px-2 text-left text-sm">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="capitalize-first">
                            { task.name } due on { task.dueDate }
                        </div>
                        <div>
                            { task.status } - { task.completionPercentage }%
                        </div>
                    </div>
                    <div className="flex items-center">
                        actions
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
