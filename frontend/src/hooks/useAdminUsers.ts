import { useState, useEffect, useCallback } from 'react';
import {
  getAllUsers,
  deleteUser as deleteUserApi,
} from '../services/admin.service';
import type { User } from '../types/user';
import type { UseAdminUsersResult } from '../types/hooks';

export const useAdminUsers = (token: string | null): UseAdminUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async (): Promise<void> => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllUsers(token);
      setUsers(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Nepodařilo se načíst uživatele');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const deleteUser = useCallback(
    async (userId: number): Promise<void> => {
      if (!token) return;
      if (!window.confirm('Opravdu chceš tohoto uživatele smazat?')) return;

      try {
        await deleteUserApi(userId, token);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Nepodařilo se smazat uživatele');
        }
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    error,
    loading,
    fetchUsers,
    deleteUser,
  };
};
