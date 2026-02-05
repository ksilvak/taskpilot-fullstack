import { UseUserResult } from '@/types/hooks';
import { getUser, updateUser } from '@/services/user.service';
import { useCallback, useEffect, useState } from 'react';
import type { User } from '@/types/user';

export function useUser(token: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (): Promise<void> => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await getUser(token);
      setUser(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Nepodařilo se načíst profil');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const updateName = useCallback(
    async (firstName: string, lastName: string): Promise<void> => {
      if (!token) return;
      try {
        setLoading(true);
        const updatedUser = await updateUser(firstName, lastName, token);
        setUser(updatedUser);
        setError(null);
      } catch {
        setError('Nepodařilo se uložit jméno');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    updateName,
  };
}
