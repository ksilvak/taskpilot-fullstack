import { useCallback, useEffect, useState } from 'react';
import { login, register } from '../services/auth.service';
import type { User } from '../types/user';

interface TokenPayload {
  userId: number;
  role: User['role'];
  email?: string;
}

const parseToken = (token: string): TokenPayload | null => {
    try {
         const payload = token.split('.')[1];
        if (!payload) return null;
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};


export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;

        const payload = parseToken(token);
        if(!payload) return;
        
        setUser({
            id: payload.userId,
            role: payload.role,
            email: payload.email ?? '',
        })

    },[]);

    const handleLogin = useCallback(async (
        email: string, 
        password: string
    ): Promise<boolean> => {
            setLoading(true);
            setError(null);
    
            try {
                const data = await login(email, password);
                localStorage.setItem('token', data.token);
                return true;
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Neočekávaná chyba');
                }
                return false;
            } finally {
                setLoading(false);
            }
        }, []);

    const handleRegister = useCallback(async (
        email: string, 
        password: string
    ): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const data = await register(email, password);
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Neočekávaná chyba');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        setUser(null)
    }, []);

    return {
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
    };
}
