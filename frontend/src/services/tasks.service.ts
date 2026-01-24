import type { Task, TaskStatus } from '../types/task';

const API_URL = 'http://localhost:3000/api/tasks';

export async function getTasks(token: string): Promise<Task[]> {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Nepodařilo se načíst úkoly');
  return res.json();
}

export async function createTask(title: string, token: string): Promise<Task> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Nepodařilo se vytvořit úkol');
  return res.json();
}

export async function deleteTask(id: number, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Nepodařilo se smazat úkol');
}

export async function toggleTask(
  id: number,
  status: TaskStatus,
  token: string
): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Nepodařilo se upravit úkol');
  return res.json();
}
