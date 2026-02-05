import { useState } from 'react';
import { updatePassword } from '@/services/user.service';

export function usePassword(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!token) return;

    try {
      setLoading(true);
      await updatePassword(currentPassword, newPassword, token);
      setError(null);
    } catch {
      setError('Změna hesla se nezdařila');
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
  };
}
