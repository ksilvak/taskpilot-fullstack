export type TaskStatus = 'todo' | 'done';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt: string;
}
