import { Badge } from '@/shadcn/badge';
import { type TaskStatus, taskStatusLabels } from '@/types/tasks';

interface TaskStatusBadgeProps {
    status: TaskStatus
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps): React.JSX.Element {

    if (!status) {
        return <></>;
    }

    const variant = {
        NotStarted: 'default',
        InProgress: 'alternate',
        Blocked: 'destructive',
        Done: 'success',
    } as const;

    return (
        <Badge variant={ variant[status] }>
            { taskStatusLabels[status] }
        </Badge>
    );
}
