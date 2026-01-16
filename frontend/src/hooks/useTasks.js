import { useEffect, useState, useCallback } from 'react';
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from '../services/tasks.service';

export function useTasks(token) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addTask = async (title) => {
    const newTask = await createTask(title, token);
    setTasks((prev) => [newTask, ...prev]);
  };

  const removeTask = async (id) => {
    await deleteTask(id, token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompleted = async (task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    const updated = await toggleTask(task.id, newStatus, token);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
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
