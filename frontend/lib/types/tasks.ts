export type TaskStatus = 'NotStarted' | 'InProgress' | 'Blocked' | 'Done';

export const taskStatusValues = ['NotStarted', 'InProgress', 'Blocked', 'Done'] as const;

export const taskStatusLabels: Record<TaskStatus, string> = {
    NotStarted: 'Not Started',
    InProgress: 'In Progress',
    Blocked: 'Blocked',
    Done: 'Done',
};
