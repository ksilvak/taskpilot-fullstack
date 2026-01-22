import { Task } from './task';
import type { User } from './user';


export interface UseAdminUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  toggleCompleted: (task: Task) => Promise<void>;
}
