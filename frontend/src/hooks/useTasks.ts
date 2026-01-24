import { useEffect, useState, useCallback } from 'react';
import type { Task } from '../types/task';
import type { UseTasksResult } from '../types/hooks';
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from '../services/tasks.service';

export function useTasks(token: string | null): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (): Promise<void> => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addTask = async (title: string): Promise<void> => {
    if (!token) return;
    const newTask = await createTask(title, token);
    setTasks((prev) => [newTask, ...prev]);
  };

  const removeTask = async (id: number): Promise<void> => {
    if (!token) return;
    await deleteTask(id, token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompleted = async (task: Task): Promise<void> => {
    if (!token) return;
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    const updated = await toggleTask(task.id, newStatus, token);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    toggleCompleted,
  };
}
