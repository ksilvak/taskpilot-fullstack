import type { User } from '../types/user';

const API_URL = 'http://localhost:3000/api/admin';

export const getAllUsers = async (token: string): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Nepodařilo se načíst uživatele');
  }

  return response.json();
};

export const deleteUser = async (
  userId: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Nepodařilo se smazat uživatele');
  }

  return response.json();
};
