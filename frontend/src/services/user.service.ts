import type { User } from '../types/user';

const API_URL = 'http://localhost:3000/api/users';

export const getUser = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Nepodařilo se načíst uživatele');
  }

  return response.json();
};

export const updateUser = async (
  firstName: string,
  lastName: string,
  token: string
): Promise<User> => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!response.ok) {
    throw new Error('Nepodařilo se uložit profil');
  }

  return response.json();
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/me/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error('Nepodařilo se změnit heslo');
  }
};
