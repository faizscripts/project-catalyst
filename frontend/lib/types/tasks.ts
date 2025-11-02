export type TaskStatus = 'Not Started' | 'In Progress' | 'Blocked' | 'Done';

export const taskStatusValues = ['Not Started', 'In Progress', 'Blocked', 'Done'] as const;
